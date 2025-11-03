import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReminderTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reminders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'task_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'reminder_time',
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
      'reminders',
      new TableForeignKey({
        name: 'fk_reminders_task_id',
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'reminders',
      new TableIndex({
        name: 'idx_reminders_task_id',
        columnNames: ['task_id'],
      })
    );

    await queryRunner.createIndex(
      'reminders',
      new TableIndex({
        name: 'idx_reminders_task_id',
        columnNames: ['task_id'],
      })
    );

    await queryRunner.createIndex(
      'reminders',
      new TableIndex({
        name: 'idx_reminders_reminder_time',
        columnNames: ['reminder_time'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('reminders', 'idx_reminders_task_id');
    await queryRunner.dropIndex('reminders', 'idx_reminders_reminder_time');
    await queryRunner.dropForeignKey('reminders', 'fk_reminders_task_id');
    await queryRunner.dropTable('reminders');
  }
}
