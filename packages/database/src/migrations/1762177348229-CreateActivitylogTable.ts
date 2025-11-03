import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateActivitylogTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'activity_logs',
      new TableForeignKey({
        name: 'fk_activity_logs_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'activity_logs',
      new TableIndex({
        name: 'idx_activity_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'activity_logs',
      new TableIndex({
        name: 'idx_activity_logs_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'activity_logs',
      new TableIndex({
        name: 'idx_activity_logs_timestamp',
        columnNames: ['timestamp'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('activity_logs', 'idx_activity_logs_user_id');
    await queryRunner.dropIndex('activity_logs', 'idx_activity_logs_timestamp');
    await queryRunner.dropForeignKey('activity_logs', 'fk_activity_logs_user_id');
    await queryRunner.dropTable('activity_logs');
  }
}
