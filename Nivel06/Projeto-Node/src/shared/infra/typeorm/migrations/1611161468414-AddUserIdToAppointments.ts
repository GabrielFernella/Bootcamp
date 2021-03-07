import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1611161468414
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        // Adicionando a nova coluna na tabela
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    // Criando a chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',

      new TableForeignKey({
        name: 'AppointmentUser', // Nome de identificação da tabela (quando dormos remover, usamos esse nome para identificar a tabela)
        columnNames: ['user_id'], // receber a chave estrangeira
        referencedColumnNames: ['id'], // nome de coluna da outra tabela que vai referenciar essa coluna
        referencedTableName: 'users', // nome da tabela referenciada
        onDelete: 'SET NULL', // RSTRICT (n deixa ser deletado), SET NULL(seta esse campo como null), CASCADE(Deletando o User, deleta todos os agendamentos do mesmo)
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser'); // Removendo a chave estrangeira identificada pelo nome

    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
