import { Abi } from 'starknet'

export const GAME_ABI = [{"type":"impl","name":"ShapesGameImpl","interface_name":"shapes_contracts::IShapesGame"},{"type":"enum","name":"core::bool","variants":[{"name":"False","type":"()"},{"name":"True","type":"()"}]},{"type":"interface","name":"shapes_contracts::IShapesGame","items":[{"type":"function","name":"getGame","inputs":[],"outputs":[{"type":"core::felt252"}],"state_mutability":"view"},{"type":"function","name":"updateGame","inputs":[],"outputs":[],"state_mutability":"external"},{"type":"function","name":"getGameIndex","inputs":[],"outputs":[{"type":"core::felt252"}],"state_mutability":"view"},{"type":"function","name":"getGameTimestamp","inputs":[],"outputs":[{"type":"core::integer::u64"}],"state_mutability":"view"},{"type":"function","name":"getAllGames","inputs":[],"outputs":[{"type":"core::array::Array::<(core::felt252, core::integer::u64, core::array::Array::<core::array::Array::<core::integer::u8>>)>"}],"state_mutability":"view"},{"type":"function","name":"getAllGameIds","inputs":[],"outputs":[{"type":"core::array::Array::<core::felt252>"}],"state_mutability":"view"},{"type":"function","name":"getAllGameTimestamps","inputs":[],"outputs":[{"type":"core::array::Array::<core::integer::u64>"}],"state_mutability":"view"},{"type":"function","name":"getAllGameIdsAndTimestamps","inputs":[],"outputs":[{"type":"core::array::Array::<(core::felt252, core::integer::u64)>"}],"state_mutability":"view"},{"type":"function","name":"getAllGamesForAccount","inputs":[{"name":"account","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[{"type":"core::array::Array::<(core::felt252, core::integer::u32, core::integer::u64, core::array::Array::<core::array::Array::<core::integer::u8>>, core::array::Array::<core::array::Array::<core::integer::u8>>, core::felt252)>"}],"state_mutability":"view"},{"type":"function","name":"getAccountSolutionsForGame","inputs":[{"name":"account","type":"core::starknet::contract_address::ContractAddress"},{"name":"game_id","type":"core::felt252"}],"outputs":[{"type":"core::array::Array::<core::array::Array::<core::integer::u8>>"}],"state_mutability":"view"},{"type":"function","name":"isValidGame","inputs":[{"name":"game_id","type":"core::felt252"}],"outputs":[{"type":"core::bool"}],"state_mutability":"view"},{"type":"function","name":"getCompoundShape","inputs":[{"name":"game_id","type":"core::felt252"},{"name":"compound_shape_index","type":"core::integer::u8"}],"outputs":[{"type":"core::array::Array::<core::integer::u8>"}],"state_mutability":"view"},{"type":"function","name":"getShapeScoreForSolution","inputs":[{"name":"compound_shape","type":"core::array::Array::<core::integer::u8>"},{"name":"solution","type":"core::array::Array::<core::integer::u8>"}],"outputs":[{"type":"core::integer::i8"}],"state_mutability":"view"},{"type":"function","name":"getCurrentGameCompoundShapes","inputs":[],"outputs":[{"type":"core::array::Array::<core::array::Array::<core::integer::u8>>"}],"state_mutability":"view"},{"type":"function","name":"getCompoundShapesForGame","inputs":[{"name":"game_id","type":"core::felt252"}],"outputs":[{"type":"core::array::Array::<core::array::Array::<core::integer::u8>>"}],"state_mutability":"view"},{"type":"function","name":"getLastPlayedIndex","inputs":[{"name":"address","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[{"type":"core::integer::u8"}],"state_mutability":"view"},{"type":"function","name":"canPlayGame","inputs":[{"name":"address","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[{"type":"core::bool"}],"state_mutability":"view"},{"type":"function","name":"solveAll","inputs":[{"name":"solutions","type":"core::array::Array::<core::array::Array::<core::integer::u8>>"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"solve","inputs":[{"name":"solution","type":"core::array::Array::<core::integer::u8>"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"getScore","inputs":[{"name":"account","type":"core::starknet::contract_address::ContractAddress"},{"name":"game_id","type":"core::felt252"}],"outputs":[{"type":"core::integer::i8"}],"state_mutability":"view"}]},{"type":"constructor","name":"constructor","inputs":[]},{"type":"event","name":"shapes_contracts::ShapesGame::Event","kind":"enum","variants":[]}
] as const satisfies Abi