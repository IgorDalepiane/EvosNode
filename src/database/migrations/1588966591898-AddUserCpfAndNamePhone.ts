import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddUserCpfAndNamePhone1588966591898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'username',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'phoneNum',
        type: 'varchar',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'cpf')
    await queryRunner.dropColumn('user', 'username')
    await queryRunner.dropColumn('user', 'phoneNum')
  }
}
