import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityTarget, getManager } from 'typeorm';

@ValidatorConstraint({ name: 'uniqueInTable', async: true })
export default class IsUniqueInTable implements ValidatorConstraintInterface {
    async validate(text: string, args: ValidationArguments) {
        const { constraints, value } = args;
        const [column, EntityClass] = constraints as [string, EntityTarget<never>];
        const em = getManager();
        const count = await em.count(EntityClass, {
            where: {
                [column]: value,
            },
        });
        return count === 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultMessage(args: ValidationArguments) {
        return '$value is already in use.';
    }
}
