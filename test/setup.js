import fs from 'fs';
import path from 'path';
import register from 'babel-core/register';

// Ignore all node_modules except these
const modulesToCompile = [
  'react-native-vector-icons',
].map((moduleName) => new RegExp(`/node_modules/${moduleName}`));

const rcPath = path.join(process.cwd(), '.babelrc');
const source = fs.readFileSync(rcPath).toString();
const config = JSON.parse(source);

config.ignore = filename => {
  if (!(/\/node_modules\//).test(filename)) {
    return false;
  }

  const matches = modulesToCompile.filter(regex => regex.test(filename));
  const shouldIgnore = matches.length === 0;
  return shouldIgnore;
};

register(config);
