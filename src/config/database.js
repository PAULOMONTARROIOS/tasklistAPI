module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '240295',
  database: 'tasklist',
  port: '5433', //config a port, because I have a docker running with pg in 5432(default port)
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}