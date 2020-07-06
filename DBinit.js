
module.exports = function(){
    const sqlite = require('better-sqlite3');
    const sql = new sqlite('./scores.sqlite');

    //Creates initial user database, check runs on bot start in index.js

    sql.prepare("CREATE TABLE scores(user_id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, balance INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores(user_id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
    sql.pragma("foreign_keys = ON");

    //Creates initial items database
    //valid sets: furniture, clothing, hats
    
    sql.prepare("CREATE TABLE items(item_id INTEGER PRIMARY KEY, name TEXT, cost INTEGER, description TEXT, level INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_items_id ON items(item_id);").run();

    //Create Relational

    sql.prepare("CREATE TABLE bought(user_id INTEGER, item_id INTEGER, date DATETIME);").run();
}
