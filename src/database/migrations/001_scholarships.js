
exports.up = (knex) => knex.schema.createTable("scholarships", (table) => {

    table.string("id").primary().unique()
    table.string("manager").notNullable().unique()
    table.string("manager_id").notNullable().unique()
    table.string("nome").notNullable().unique()
    table.integer("isActive", 1).defaultTo(1)
    table.timestamp("create_at").defaultTo(knex.fn.now())
    table.timestamp("update_at").defaultTo(knex.raw(`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`))

})

exports.down = (knex) => knex.schema.dropTableIfExists("scholarships")
