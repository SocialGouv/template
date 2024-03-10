import path from "path";
import fs from "fs";

export const filePath = path.join(__dirname, "../public/robots.txt");

export const generateRobotsTxt = (isOnProduction: boolean, host: string) => {
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
  const robotsProd = ["User-agent: *", "Allow: /"].join("\n");

  const robot = isOnProduction ? robotsProd : robotsDev;

  fs.writeFileSync(filePath, robot);
};

const run = () => {
  generateRobotsTxt(
    process.env.PRODUCTION ? true : false,
    process.env.NEXT_PUBLIC_SITE_URL ?? "localhost"
  );
  console.log(`Robots.txt generated, production:${!!process.env.PRODUCTION}`);
};

run();
