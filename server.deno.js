import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import { Md5 } from "https://deno.land/std@0.123.0/hash/md5.ts";
import "https://deno.land/std@0.193.0/dotenv/load.ts"
import { Client } from "https://deno.land/x/mysql@v2.11.0/mod.ts"

// 必要な環境変数を取得
const HOSTNAME = Deno.env.get("HOSTNAME")
const USER = Deno.env.get("USER")
const PASSWORD = Deno.env.get("PASS")
const DBNAME = Deno.env.get("DBNAME")

const mySqlClient = await new Client().connect({
  hostname: HOSTNAME,
  username: "root",
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
    const md5 = new Md5();
    const hash = md5.update(jsonStr).toString();
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

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
