require 'rake'
require 'crxmake'

desc 'create chrome extension package'
task :crx do
  CrxMake.make(
    ex_dir: './src',
    crx_output: './package/niconico_mylist_maker.crx',
    verbose: true,
    ignoredir: /\.(?:svn|git|cvs)/
  )
end
