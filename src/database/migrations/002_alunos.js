
exports.up = (knex) => knex.schema.createTable("alunos", (table) => {

    table.string("id").primary().unique()
    table.string("manager").notNullable()
    table.string("manager_id").notNullable()
    table.string("nome").notNullable()
    table.string("scholarship_id").notNullable()
    table.integer("isActive", 1).defaultTo(1)
    table.timestamp("create_at").defaultTo(knex.fn.now())
    table.timestamp("update_at").defaultTo(knex.raw(`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`))
    table.foreign("scholarship_id").references("id").inTable("scholarships").onUpdate("CASCADE").onDelete("CASCADE")

})

exports.down = (knex) => knex.schema.dropTableIfExists("alunos")
