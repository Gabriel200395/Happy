import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602697374393 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'orphanage_id',
          type: 'integer'
        }

      ],

      foreignKeys: [
        {
          name: 'ImageOrphanage',   // name da referencia 
          columnNames: ['orphanage_id'], // coluna da referencia
          referencedTableName: 'orphanages', //  referencia da tabela
          referencedColumnNames: ['id'],   // referencia do dado tabela
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropTable('images');

  }

}
