import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { SHAKE128 } from "https://code4fukui.github.io/SHA3/SHAKE128.js";
import "https://deno.land/std@0.193.0/dotenv/load.ts"
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts"

// 必要な環境変数を取得
const HOSTNAME = Deno.env.get("HOSTNAME")
const USER = Deno.env.get("MYSQLUSER")
const PASSWORD = Deno.env.get("PASS")
const DBNAME = Deno.env.get("DBNAME")

const mySqlClient = await new Client().connect({
  hostname: HOSTNAME,
  username: USER,
  password: PASSWORD,
  db: DBNAME
})

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("jigインターンへようこそ！");
  }
  if (req.method === "POST" && pathname === "/save-firework") {
    const jsonStr = JSON.stringify(await req.json());
    const hash = SHAKE128.digest(jsonStr, 128);
    mySqlClient.execute(`insert into recipe (recipe, hash) value (?, ?);`, [jsonStr, hash]);
    return new Response(hash);
  }

  if (req.method === "GET" && pathname === "/load-firework") {
    const param = await new URL(req.url).searchParams.get("hash");
    const recipe = await mySqlClient.query(`select recipe from recipe where hash=?;`, [param]);
    return new Response(recipe[0].recipe)
  }

  if (req.method === "GET" && pathname === "/color-name") {
    const colorName = await mySqlClient.query(`SELECT * FROM  color;`);
    return new Response(JSON.stringify(colorName));
  }

  if (req.method === "GET" && pathname === "/types") {
    const types = await mySqlClient.query(`SELECT * FROM  type;`);
    return new Response(JSON.stringify(types));
  }

  if (req.method === "POST" && pathname === "/regist-color-code") {
    const json = await req.json();
    const name = json.name;
    const code = json.code;
    if (name !== "" && code !== ""){
      const result = await mySqlClient.execute("insert into color (name, code) value (?, ?);", [name,code]);
      if (result.affectedRows === 1){
        return new Response("登録完了しました")
      }else{
        return new Response("登録失敗しました")
      }
    }
    return new Response("空欄があります")
  }

  if (req.method === "POST" && pathname === "/regist-type") {
    const json = await req.json();
    const name = json.name;
    const url = json.url;
    if (name !== "" && url !== ""){
      const result = await mySqlClient.execute("insert into type (name, url) value (?, ?);", [name,url]);
      if (result.affectedRows === 1){
        return new Response("登録完了しました")
      }else{
        return new Response("登録失敗しました")
      }
    }
    return new Response("空欄があります")
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
