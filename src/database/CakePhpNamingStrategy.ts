import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { snakeCase } from 'typeorm/util/StringUtils';
import pluralize from 'pluralize';
import { Table } from 'typeorm';

export default class CakePhpNamingStrategy extends SnakeNamingStrategy {
    tableName(className: string, customName: string): string {
        return customName || pluralize(snakeCase(className.replace('Entity', '')));
    }

    indexName(tableOrName: Table | string, columnNames: string[], where?: string): string {
        const clonedColumnNames = [...columnNames];
        clonedColumnNames.sort();
        const tableName = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        const replacedTableName = tableName.replace('.', '_');
        let key = `${replacedTableName}_${clonedColumnNames.join('_')}`;
        if (where) key += `_${where}`;

        return key.substr(0, 20);
    }
}
