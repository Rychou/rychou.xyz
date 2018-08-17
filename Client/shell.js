var shell = require('shelljs');

shell.echo('abc')
if (shell.exec('npm run build').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}

shell.cp ('-r', './dist/*', '../../Rychou');
shell.cd('../../Rychou');

shell.exec('git add .');
shell.exec("git commit -m 'autocommit'")
shell.exec('git push')
