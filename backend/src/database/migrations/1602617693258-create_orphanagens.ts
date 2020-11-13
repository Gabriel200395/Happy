import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanagens1602617693258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //  Realizar as alterações no banco
        // Criar tabela, criar novo campo, deletar algum campo

        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,   // nao pode ser negativa 
                    isPrimary: true,   // chave primaria da tabela 
                    isGenerated: true,   // essa coluna vai gerada automaticamente 
                    generationStrategy: 'increment',  // incrementar cada tabela.
                },

                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },

                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'about',
                    type: 'text'
                },

                {
                    name: 'instructions',
                    type: 'text'
                }, 
                
                {
                    name: 'opening_hours',
                    type: 'varchar'
                }, 
                
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //  Desfazer as alterações no up
        await queryRunner.dropTable('orphanages')
    }

}
