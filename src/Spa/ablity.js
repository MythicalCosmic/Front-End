import {AbilityBuilder, createMongoAbility} from '@casl/ability';

export default function defineAbilitiesFor(role) {
    const {can, cannot, build} = new AbilityBuilder(createMongoAbility);

    if (role === 'admin') {
        can('access', 'admin');
        can('view', 'all');
        can('use', 'all');
        cannot('use', 'PulYechish').because('Only Super Admins can use Pul Yechish')
        cannot('use', 'Inkassa').because('Only Super Admins can use Inkkassa')
    } else if (role === 'kassa') {
        can('access', 'kassa');
        cannot('view', 'qoldiqlar');
        cannot('view', 'RoliComponent');
        cannot('view', 'Actions');
        cannot('delete', 'anything');
    } else if (role === 'superAdmin') {
        can('manage', 'all');
    } else {
        cannot('access', 'admin');
        cannot('access', 'kassa');
    }

    return build();
}