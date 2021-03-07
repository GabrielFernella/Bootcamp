import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToPtoviderId1604594782492
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider'); // Removendo a coluna antiga

    await queryRunner.addColumn(
      'appointments',

      new TableColumn({
        // Adicionando a nova coluna na tabela

        name: 'provider_id',

        type: 'uuid',

        isNullable: true,
      }),
    );

    // Criando a chave estrangeira

    await queryRunner.createForeignKey(
      'appointments',

      new TableForeignKey({
        name: 'AppointmentProvider', // Nome de identificação da tabela (quando dormos remover, usamos esse nome para identificar a tabela)

        columnNames: ['provider_id'], // receber a chave estrangeira

        referencedColumnNames: ['id'], // nome de coluna da outra tabela que vai referenciar essa coluna

        referencedTableName: 'users', // nome da tabela referenciada

        onDelete: 'SET NULL', // RSTRICT (n deixa ser deletado), SET NULL(seta esse campo como null), CASCADE(Deletando o User, deleta todos os agendamentos do mesmo)

        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Faça o retrocesso ao contrário ex: 123 - 321 (ordem reversa)

    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider'); // Removendo a chave estrangeira identificada pelo nome

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',

      new TableColumn({
        name: 'provider',

        type: 'varchar',
      }),
    );
  }
}
