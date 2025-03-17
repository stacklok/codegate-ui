# Changelog

## [0.20.0](https://github.com/stacklok/codegate-ui/compare/v0.19.1...v0.20.0) (2025-03-17)


### Features

* shareable workspaces MVP (frontend) ([#379](https://github.com/stacklok/codegate-ui/issues/379)) ([6baf15c](https://github.com/stacklok/codegate-ui/commit/6baf15c5b51ff58882975148183e90abdade1f2b))


### Bug Fixes

* use package.json overrides to bump `@babel/runtime` & `prismjs` to fix npm audit warnings ([#396](https://github.com/stacklok/codegate-ui/issues/396)) ([79041a1](https://github.com/stacklok/codegate-ui/commit/79041a1aa7635a1539aec3618cb56d2133a48cf3))

## [0.19.1](https://github.com/stacklok/codegate-ui/compare/v0.19.0...v0.19.1) (2025-03-12)


### Bug Fixes

* implement server side pagination in frontend ([#368](https://github.com/stacklok/codegate-ui/issues/368)) ([b730c4a](https://github.com/stacklok/codegate-ui/commit/b730c4aada89c102f89d553a0c00d5eb45378fdb))
* pagination bug ([#388](https://github.com/stacklok/codegate-ui/issues/388)) ([0fb0ba7](https://github.com/stacklok/codegate-ui/commit/0fb0ba74f80dcff2ac789d245dcd01cf8ea6466c))

## [0.19.0](https://github.com/stacklok/codegate-ui/compare/v0.18.1...v0.19.0) (2025-03-05)


### Features

* replace muxing placeholder ([#365](https://github.com/stacklok/codegate-ui/issues/365)) ([b426bf4](https://github.com/stacklok/codegate-ui/commit/b426bf417bccd294a2bd29d4ab98a5883135529d))


### Bug Fixes

* handle breaking changes to workspace config ([#349](https://github.com/stacklok/codegate-ui/issues/349)) ([6a897e3](https://github.com/stacklok/codegate-ui/commit/6a897e3331d3b907b7d0a264bf51bc9239bc3aee))
* remove duplicate react-query-devtools ([#342](https://github.com/stacklok/codegate-ui/issues/342)) ([63bf5ea](https://github.com/stacklok/codegate-ui/commit/63bf5ea14caebd1acf812c7bd71ac40226938b09))

## [0.18.1](https://github.com/stacklok/codegate-ui/compare/v0.18.0...v0.18.1) (2025-03-03)


### Bug Fixes

* id separator for provider, model muxing rule ([#360](https://github.com/stacklok/codegate-ui/issues/360)) ([3cff061](https://github.com/stacklok/codegate-ui/commit/3cff0613a57f4c9c69add80f63d072238e797656))

## [0.18.0](https://github.com/stacklok/codegate-ui/compare/v0.17.0...v0.18.0) (2025-02-21)


### Features

* support muxing fim and chat ([#343](https://github.com/stacklok/codegate-ui/issues/343)) ([14b1b2d](https://github.com/stacklok/codegate-ui/commit/14b1b2d470889957ca836de4a26a179fb6c56e5c))

## [0.17.0](https://github.com/stacklok/codegate-ui/compare/v0.16.0...v0.17.0) (2025-02-20)


### Features

* add workspaces impacted by provider deletion ([#340](https://github.com/stacklok/codegate-ui/issues/340)) ([5c0544f](https://github.com/stacklok/codegate-ui/commit/5c0544f57fadc742fe160ee6f359cc5da5f8337e))
* strip markdown in messages table ([#336](https://github.com/stacklok/codegate-ui/issues/336)) ([2f8ab95](https://github.com/stacklok/codegate-ui/commit/2f8ab953590deca22271604b0400b7c5c19c40be))
* support PII on the dashboard ([#326](https://github.com/stacklok/codegate-ui/issues/326)) ([279fe57](https://github.com/stacklok/codegate-ui/commit/279fe57f68994466c8b1f94c227dadb177e56c77))


### Bug Fixes

* audit vuln deps ([#332](https://github.com/stacklok/codegate-ui/issues/332)) ([73c55a2](https://github.com/stacklok/codegate-ui/commit/73c55a2b3cf763c7b78747836c551f41dc8dfda5))
* inline code word wrap ([#335](https://github.com/stacklok/codegate-ui/issues/335)) ([38715de](https://github.com/stacklok/codegate-ui/commit/38715de6395b7ae0e2f50fd6ce8f64e4c341c42f))

## [0.16.0](https://github.com/stacklok/codegate-ui/compare/v0.15.0...v0.16.0) (2025-02-17)


### Features

* add activate workspace button into detail page ([#328](https://github.com/stacklok/codegate-ui/issues/328)) ([c85e1aa](https://github.com/stacklok/codegate-ui/commit/c85e1aa8011c688d435e0abb11b44cf297d05e61))


### Bug Fixes

* cert instructions ([#317](https://github.com/stacklok/codegate-ui/issues/317)) ([2eb9579](https://github.com/stacklok/codegate-ui/commit/2eb95794f63988fa7f7f29daf2e0c41a9cd9c356))

## [0.15.0](https://github.com/stacklok/codegate-ui/compare/v0.14.1...v0.15.0) (2025-02-14)


### Features

* add support muxing rules v2 ([#311](https://github.com/stacklok/codegate-ui/issues/311)) ([38f2ecc](https://github.com/stacklok/codegate-ui/commit/38f2ecc93f1b503c6b1eaf31daaaedc86996b5fc))
* enable word wrap for prompt editor ([#312](https://github.com/stacklok/codegate-ui/issues/312)) ([7f2c040](https://github.com/stacklok/codegate-ui/commit/7f2c040ad7d9cceda42ac70e40d716272f82704f))
* extend new revert logic to "custom instructions" ([#304](https://github.com/stacklok/codegate-ui/issues/304)) ([40f86a5](https://github.com/stacklok/codegate-ui/commit/40f86a5f591fe67863d3a3082a625cfd1b3080b8))
* implement "Revert" button for workspace name ([#276](https://github.com/stacklok/codegate-ui/issues/276)) ([7e66ff0](https://github.com/stacklok/codegate-ui/commit/7e66ff0ecff35b2dddde048d6ed864e2b621cb8f))
* make preferred model form consistent with the other forms ([#309](https://github.com/stacklok/codegate-ui/issues/309)) ([6b57fd3](https://github.com/stacklok/codegate-ui/commit/6b57fd3f589ed036c2f51bd6c9066fc767476aad))
* new messages endpoint ([#287](https://github.com/stacklok/codegate-ui/issues/287)) ([ccbce0c](https://github.com/stacklok/codegate-ui/commit/ccbce0c627d73efb8a2bbf82eeaf8fec4e295594))
* show README for prompts when available ([#313](https://github.com/stacklok/codegate-ui/issues/313)) ([a388e49](https://github.com/stacklok/codegate-ui/commit/a388e49efcf3fa4d7e003604ca7ecd72f76b1fb6))
* switch help and setting menu ([#310](https://github.com/stacklok/codegate-ui/issues/310)) ([32d46a0](https://github.com/stacklok/codegate-ui/commit/32d46a0f87291e2b09a22dfec737b0bd6befbb4b)), closes [#303](https://github.com/stacklok/codegate-ui/issues/303)


### Bug Fixes

* cannot delete endpoint URL ([#318](https://github.com/stacklok/codegate-ui/issues/318)) ([18ac940](https://github.com/stacklok/codegate-ui/commit/18ac940f70fffd918ef1fd37701aca955241e47b)), closes [#284](https://github.com/stacklok/codegate-ui/issues/284)
* error displayed when activating workspace ([#305](https://github.com/stacklok/codegate-ui/issues/305)) ([be99509](https://github.com/stacklok/codegate-ui/commit/be9950999cd76bc1b9a358b6c9e61e4129b73aa1))
* error UI styling bug ([#307](https://github.com/stacklok/codegate-ui/issues/307)) ([00bf204](https://github.com/stacklok/codegate-ui/commit/00bf20466d42e92869503045701f7cce5fc2ab21))
* focus ring in version dropdown ([#314](https://github.com/stacklok/codegate-ui/issues/314)) ([3a00cfa](https://github.com/stacklok/codegate-ui/commit/3a00cfa6d10b5fb85ec80ae4e8305e362f9db215))
* markdown syntax highlighting ([#316](https://github.com/stacklok/codegate-ui/issues/316)) ([35ba1a4](https://github.com/stacklok/codegate-ui/commit/35ba1a43dee0796d6978baef4b79a11ecdf8ca07))
* only show "cannot edit default" on default workspace [#308](https://github.com/stacklok/codegate-ui/issues/308) ([5200192](https://github.com/stacklok/codegate-ui/commit/520019221d7709b5e9ff5000474f40f1092ae69e))
* remove pagination state when filtering messages ([#306](https://github.com/stacklok/codegate-ui/issues/306)) ([3d586fb](https://github.com/stacklok/codegate-ui/commit/3d586fbfabf445d9f4c35dd9919295a5a49b5953))

## [0.14.1](https://github.com/stacklok/codegate-ui/compare/v0.14.0...v0.14.1) (2025-02-07)

### Bug Fixes

- set 5s of duration for all the toast notifications ([#281](https://github.com/stacklok/codegate-ui/issues/281)) ([2542b5f](https://github.com/stacklok/codegate-ui/commit/2542b5fe2c6e67ea8ac055baa47100591e468570))

## [0.14.0](https://github.com/stacklok/codegate-ui/compare/v0.13.1...v0.14.0) (2025-02-07)

### Features

- show alert detail in the conversation page ([#277](https://github.com/stacklok/codegate-ui/issues/277)) ([8154d3e](https://github.com/stacklok/codegate-ui/commit/8154d3e9c8082f6aac0fc2914621dd99f8f71936))

## [0.13.1](https://github.com/stacklok/codegate-ui/compare/v0.13.0...v0.13.1) (2025-02-07)

### Bug Fixes

- provider endpoint and mux section ([#275](https://github.com/stacklok/codegate-ui/issues/275)) ([cadbd5f](https://github.com/stacklok/codegate-ui/commit/cadbd5f71125a9a0dac9824c6f1bdf8aabca4071))

### Reverts

- openapi-ts upgrade ([#273](https://github.com/stacklok/codegate-ui/issues/273)) ([2a5234c](https://github.com/stacklok/codegate-ui/commit/2a5234c1246577070fd978397db87b637c42cd9f))

## [0.13.0](https://github.com/stacklok/codegate-ui/compare/v0.12.2...v0.13.0) (2025-02-06)

### Features

- enforce sensible defaults for react-query ([#268](https://github.com/stacklok/codegate-ui/issues/268)) ([5445eb6](https://github.com/stacklok/codegate-ui/commit/5445eb6aefbd6270d7258dd3bbf3d03c1beea83a))

## [0.12.2](https://github.com/stacklok/codegate-ui/compare/v0.12.1...v0.12.2) (2025-02-05)

### Bug Fixes

- implement default caching options for react-query ([#265](https://github.com/stacklok/codegate-ui/issues/265)) ([694964f](https://github.com/stacklok/codegate-ui/commit/694964f7f0adfb3f3181da2680c98e95016e534f))

## [0.12.1](https://github.com/stacklok/codegate-ui/compare/v0.12.0...v0.12.1) (2025-02-05)

### Bug Fixes

- create form provider submit ([#263](https://github.com/stacklok/codegate-ui/issues/263)) ([3e4632e](https://github.com/stacklok/codegate-ui/commit/3e4632e8b169abb3605d86d27ccf79004ba13a41))

## [0.12.0](https://github.com/stacklok/codegate-ui/compare/v0.11.1...v0.12.0) (2025-02-05)

### Features

- add providers page and enable muxing ([#253](https://github.com/stacklok/codegate-ui/issues/253)) ([22c47ae](https://github.com/stacklok/codegate-ui/commit/22c47aed9aa3f527b17a4b14badff31a80100039))
- react-query-utils ([#257](https://github.com/stacklok/codegate-ui/issues/257)) ([7d4a854](https://github.com/stacklok/codegate-ui/commit/7d4a854510db81e3b05e19db2d0a4f63363cd782))

## [0.11.1](https://github.com/stacklok/codegate-ui/compare/v0.11.0...v0.11.1) (2025-02-05)

### Bug Fixes

- don't call window reload every time we receive an alert ([#251](https://github.com/stacklok/codegate-ui/issues/251)) ([a2da3ae](https://github.com/stacklok/codegate-ui/commit/a2da3aeac595ee4328e833858a81b34a2a0472cc))

## [0.11.0](https://github.com/stacklok/codegate-ui/compare/v0.10.0...v0.11.0) (2025-02-03)

### Features

- **alerts:** tabs for filtering table ([#234](https://github.com/stacklok/codegate-ui/issues/234)) ([2765917](https://github.com/stacklok/codegate-ui/commit/27659171019e0428279830049bbc38eace0123cc))
- format token usage with "compact" notation ([#238](https://github.com/stacklok/codegate-ui/issues/238)) ([9911a7a](https://github.com/stacklok/codegate-ui/commit/9911a7a580d84c493276c547b252dde1bea23180))
- implement empty state for tables ([#232](https://github.com/stacklok/codegate-ui/issues/232)) ([e39dbc3](https://github.com/stacklok/codegate-ui/commit/e39dbc3a715ac330d2aa15d4dc2dc5a7bbc77c00))
- remove word "Dashboard" from header ([#236](https://github.com/stacklok/codegate-ui/issues/236)) ([89a6dc4](https://github.com/stacklok/codegate-ui/commit/89a6dc4feaa47d7293400de9247ab15f4c0d3a55))
- richer empty states ([#239](https://github.com/stacklok/codegate-ui/issues/239)) ([c8990c2](https://github.com/stacklok/codegate-ui/commit/c8990c2687ca8f4da3c481f328373ec95aa18859))

## [0.10.0](https://github.com/stacklok/codegate-ui/compare/v0.9.0...v0.10.0) (2025-01-30)

### Features

- add prompt picker ([#212](https://github.com/stacklok/codegate-ui/issues/212)) ([25a531e](https://github.com/stacklok/codegate-ui/commit/25a531eba9b75cc7533a2824ec647894019bb09d))
- add workspace preferred model ([#217](https://github.com/stacklok/codegate-ui/issues/217)) ([90dfbe9](https://github.com/stacklok/codegate-ui/commit/90dfbe9befc97d800f2a55f23390e9a1754c0aa2))
- bump UIKit to incorporate color palette change ([#229](https://github.com/stacklok/codegate-ui/issues/229)) ([0e877b4](https://github.com/stacklok/codegate-ui/commit/0e877b4d3dd4a6cc1ebaef7f2a394e23aeaff22d))
- implement new table design ([#189](https://github.com/stacklok/codegate-ui/issues/189)) ([97bc4ea](https://github.com/stacklok/codegate-ui/commit/97bc4ea104cbd88e81dbd1aadd055fc04687f977))
- initial work on alerts summary cards ([#222](https://github.com/stacklok/codegate-ui/issues/222)) ([2732434](https://github.com/stacklok/codegate-ui/commit/2732434e45e0ff2862b0173cc708581992e63d18))
- move health check to header ([#218](https://github.com/stacklok/codegate-ui/issues/218)) ([d9652bb](https://github.com/stacklok/codegate-ui/commit/d9652bb3ac005d5140031f4378d54f41b3adafd1))
- quick "go to settings" for workspace selector ([#213](https://github.com/stacklok/codegate-ui/issues/213)) ([b683d56](https://github.com/stacklok/codegate-ui/commit/b683d56ae7ab5cfceb527727fc86a298583bc8cc))
- replace lucide icons with untitled icons ([#221](https://github.com/stacklok/codegate-ui/issues/221)) ([2c3c7fc](https://github.com/stacklok/codegate-ui/commit/2c3c7fc06e3d13489c3e424689013a6431eb1977))
- show token usage on alerts table ([#216](https://github.com/stacklok/codegate-ui/issues/216)) ([f9461bc](https://github.com/stacklok/codegate-ui/commit/f9461bcf8452715086362154659998f287b965d5))

### Bug Fixes

- **alert detected type:** don't default to leaked secret ([#208](https://github.com/stacklok/codegate-ui/issues/208)) ([0e64263](https://github.com/stacklok/codegate-ui/commit/0e64263f00258d0d8a7139ae5256696701673959))
- **alerts:** memoize selecting alerts ([#231](https://github.com/stacklok/codegate-ui/issues/231)) ([f810e2b](https://github.com/stacklok/codegate-ui/commit/f810e2b0e77b1992e8b54b91f301943505fcf03b))
- issue templates fix ([#224](https://github.com/stacklok/codegate-ui/issues/224)) ([4a1cc7d](https://github.com/stacklok/codegate-ui/commit/4a1cc7d3f70d1ce78d1933de56467f844a4308cb))
- issue templates validation fix ([#225](https://github.com/stacklok/codegate-ui/issues/225)) ([efec5fa](https://github.com/stacklok/codegate-ui/commit/efec5fa1e82195a09245cfbc8c6ec7ed58f7c3b9))
- restore lockfile ([#223](https://github.com/stacklok/codegate-ui/issues/223)) ([a3e86e5](https://github.com/stacklok/codegate-ui/commit/a3e86e58272cd4c434ae2d816f80d4c278461786))

## [0.9.0](https://github.com/stacklok/codegate-ui/compare/v0.8.0...v0.9.0) (2025-01-24)

### Features

- add not_found route ([#194](https://github.com/stacklok/codegate-ui/issues/194)) ([d865730](https://github.com/stacklok/codegate-ui/commit/d865730201eaff07e0e1852750803d0a262e5df6))

### Bug Fixes

- workspace hard delete nits ([#202](https://github.com/stacklok/codegate-ui/issues/202)) ([9129a5b](https://github.com/stacklok/codegate-ui/commit/9129a5b983a1b54f7d3b5cffc19cce85a955045a))

## [0.8.0](https://github.com/stacklok/codegate-ui/compare/v0.7.2...v0.8.0) (2025-01-24)

### Features

- implement hard delete for workspaces & refactor workspaces table to allow multiple actions ([#185](https://github.com/stacklok/codegate-ui/issues/185)) ([a98492a](https://github.com/stacklok/codegate-ui/commit/a98492a8c24067ccd037e6fa753caf9994558967))
- implement use toast mutation for workspaces ([#184](https://github.com/stacklok/codegate-ui/issues/184)) ([a67b265](https://github.com/stacklok/codegate-ui/commit/a67b26518cd5ef1c3f6106b604d45456ffc03cf4))
- redirect to conversation from alerts table ([#191](https://github.com/stacklok/codegate-ui/issues/191)) ([646ed5a](https://github.com/stacklok/codegate-ui/commit/646ed5a6b14661b3956dd2685d9065c4c0d110aa))
- useKbdShortcuts hook & example implementation ([#180](https://github.com/stacklok/codegate-ui/issues/180)) ([0d935a3](https://github.com/stacklok/codegate-ui/commit/0d935a3b263d5c18c86d5ba669554cf3f2e1f3a7))
- useToastMutation hook ([#183](https://github.com/stacklok/codegate-ui/issues/183)) ([9fe55a5](https://github.com/stacklok/codegate-ui/commit/9fe55a524fa776348fcb6719d625f57aac36d60a))

### Bug Fixes

- fix small visual glithc in help menu ([#175](https://github.com/stacklok/codegate-ui/issues/175)) ([7031047](https://github.com/stacklok/codegate-ui/commit/70310476e59085c18755dc3eed6d9a2f09523f0f))
- parsing promptList text and breadcrumb ([#177](https://github.com/stacklok/codegate-ui/issues/177)) ([6da034d](https://github.com/stacklok/codegate-ui/commit/6da034d9ddb028202c14851319e380f61b139473))
- sort filtered alerts before pagination ([#190](https://github.com/stacklok/codegate-ui/issues/190)) ([d844610](https://github.com/stacklok/codegate-ui/commit/d84461041076f9647ceae93220deb071d1897a17))

## [0.7.2](https://github.com/stacklok/codegate-ui/compare/v0.7.1...v0.7.2) (2025-01-22)

### Bug Fixes

- fix client side navigation ([#173](https://github.com/stacklok/codegate-ui/issues/173)) ([30b1112](https://github.com/stacklok/codegate-ui/commit/30b11127c2ea4303a3973fcc1f4f89a7957e6710))
- make custom icons inherit text color ([#170](https://github.com/stacklok/codegate-ui/issues/170)) ([e8c3880](https://github.com/stacklok/codegate-ui/commit/e8c3880e4663c198e77383d21406741c14c002fc)), closes [#156](https://github.com/stacklok/codegate-ui/issues/156)

## [0.7.1](https://github.com/stacklok/codegate-ui/compare/v0.7.0...v0.7.1) (2025-01-22)

### Bug Fixes

- show banner in archived workspace ([#165](https://github.com/stacklok/codegate-ui/issues/165)) ([e77a837](https://github.com/stacklok/codegate-ui/commit/e77a83722f5a83b65d185b14c7e618889703b904))

## [0.7.0](https://github.com/stacklok/codegate-ui/compare/v0.6.1...v0.7.0) (2025-01-22)

### Features

- add create workspace ([#133](https://github.com/stacklok/codegate-ui/issues/133)) ([1c3e0f0](https://github.com/stacklok/codegate-ui/commit/1c3e0f04e698d889d7a7e36234e31a0672c82933))
- add workspaces page ([#128](https://github.com/stacklok/codegate-ui/issues/128)) ([750d8f6](https://github.com/stacklok/codegate-ui/commit/750d8f6db2fe6110ffe6c720db663d8fae2163f1))
- archive workspace ([#145](https://github.com/stacklok/codegate-ui/issues/145)) ([34dc350](https://github.com/stacklok/codegate-ui/commit/34dc35090d14a959189deedae49454fca0dba08e))
- enable toggle workspace, invalidate on workspace update ([#130](https://github.com/stacklok/codegate-ui/issues/130)) ([8904d8b](https://github.com/stacklok/codegate-ui/commit/8904d8bfc4b8946beeb7506df72d2b12504b33d1))
- implement breadcrumbs according to design ([#131](https://github.com/stacklok/codegate-ui/issues/131)) ([43fdf83](https://github.com/stacklok/codegate-ui/commit/43fdf83d8c7fca94cf04a7d0a13b06ba30f7ea74))
- implement new menu design ([#152](https://github.com/stacklok/codegate-ui/issues/152)) ([c63de9e](https://github.com/stacklok/codegate-ui/commit/c63de9e1c649d589421ecc94783a6e12a7c132c1))
- rename workspace ([#163](https://github.com/stacklok/codegate-ui/issues/163)) ([3b68754](https://github.com/stacklok/codegate-ui/commit/3b6875489c92a7d7629250e1d984f36f4e56bda5))
- show archived workspaces and restore it ([#154](https://github.com/stacklok/codegate-ui/issues/154)) ([d7e244f](https://github.com/stacklok/codegate-ui/commit/d7e244fecb358c572a26490344c30e5362b2c78a))
- workspace scoped queries (messages & alerts) ([#140](https://github.com/stacklok/codegate-ui/issues/140)) ([500d48d](https://github.com/stacklok/codegate-ui/commit/500d48d06014b6e54bc55942a7cc705628bc30bc))
- workspace settings route & system prompt editor ([#114](https://github.com/stacklok/codegate-ui/issues/114)) ([0d9d752](https://github.com/stacklok/codegate-ui/commit/0d9d75226e4670b54e33c9e184c2339b341eaee9))
- workspace system prompt CRUD ([#147](https://github.com/stacklok/codegate-ui/issues/147)) ([0ed8d66](https://github.com/stacklok/codegate-ui/commit/0ed8d669862239129af93c6c998461f25a83849f))
- **workspace:** add dropdown ([#123](https://github.com/stacklok/codegate-ui/issues/123)) ([51fd254](https://github.com/stacklok/codegate-ui/commit/51fd254affd1333b3f839fb6de7b5058fce68ca2))

### Bug Fixes

- buttons in workspace page ([#159](https://github.com/stacklok/codegate-ui/issues/159)) ([1d80c9f](https://github.com/stacklok/codegate-ui/commit/1d80c9fa761cb3da341ef471480d4665effd86c1))
- cert instructions ([#150](https://github.com/stacklok/codegate-ui/issues/150)) ([81a1846](https://github.com/stacklok/codegate-ui/commit/81a1846767d7d2996848b0c26bf296e989f620ce))
- enter to submit workspace create form ([#142](https://github.com/stacklok/codegate-ui/issues/142)) ([14a9cfe](https://github.com/stacklok/codegate-ui/commit/14a9cfe642e6cb0e8def62422d2fb4f562d0a729))
- fix providers for better debugging ([#141](https://github.com/stacklok/codegate-ui/issues/141)) ([d471fd0](https://github.com/stacklok/codegate-ui/commit/d471fd0e91b5adc30aad34acb027d922c5026302))
- title changed ([#158](https://github.com/stacklok/codegate-ui/issues/158)) ([ff6ce7f](https://github.com/stacklok/codegate-ui/commit/ff6ce7fa73039cc8f32fcabd1b1f11d886d25823))
- workspace ui nits ([#132](https://github.com/stacklok/codegate-ui/issues/132)) ([2c97fd4](https://github.com/stacklok/codegate-ui/commit/2c97fd4982a17ece0c6c0475bd8d8ac7ad1420a7))
- workspaces dropdown overflow ([#138](https://github.com/stacklok/codegate-ui/issues/138)) ([bc08ac9](https://github.com/stacklok/codegate-ui/commit/bc08ac918e8de8f3a01f987549459cd108e7d4fc))

## [0.6.1](https://github.com/stacklok/codegate-ui/compare/v0.6.0...v0.6.1) (2025-01-20)

### Bug Fixes

- version endpoint ([#119](https://github.com/stacklok/codegate-ui/issues/119)) ([eada275](https://github.com/stacklok/codegate-ui/commit/eada275d8bd40f38b1930bd7fb9be5ddf5cdd494))

## [0.6.0](https://github.com/stacklok/codegate-ui/compare/v0.5.0...v0.6.0) (2025-01-20)

### Features

- add pagination for alerts table ([#104](https://github.com/stacklok/codegate-ui/issues/104)) ([a38e2cd](https://github.com/stacklok/codegate-ui/commit/a38e2cdd2ced63de130fe3a88118cc00a977b41f))
- **workspaces:** create workspaces query hook ([#111](https://github.com/stacklok/codegate-ui/issues/111)) ([8ba7d36](https://github.com/stacklok/codegate-ui/commit/8ba7d369a6a51dfc66e4cc445b196bde77969061))

### Bug Fixes

- breaking changes in openapi spec ([#113](https://github.com/stacklok/codegate-ui/issues/113)) ([cd549d2](https://github.com/stacklok/codegate-ui/commit/cd549d2feb2d87c97205653458faa586442cfc8c))

## [0.5.0](https://github.com/stacklok/codegate-ui/compare/v0.4.1...v0.5.0) (2025-01-17)

### Features

- initial work on codegate version check widget ([#94](https://github.com/stacklok/codegate-ui/issues/94)) ([0baa10b](https://github.com/stacklok/codegate-ui/commit/0baa10ba8875c6baa977b34eba637d8b1e11aa63))
- react-query hey-api integration ([#101](https://github.com/stacklok/codegate-ui/issues/101)) ([58d4d47](https://github.com/stacklok/codegate-ui/commit/58d4d477677f5047c3b7efa7f744a5e88c57dd8f))

## [0.4.1](https://github.com/stacklok/codegate-ui/compare/v0.4.0...v0.4.1) (2025-01-17)

### Bug Fixes

- fix data fetching bug ([#99](https://github.com/stacklok/codegate-ui/issues/99)) ([d75c445](https://github.com/stacklok/codegate-ui/commit/d75c445332827d8b1141f03d4c5a42627b6c71c7))

## [0.4.0](https://github.com/stacklok/codegate-ui/compare/v0.3.0...v0.4.0) (2025-01-16)

### Features

- add dark mode switcher ([#89](https://github.com/stacklok/codegate-ui/issues/89)) ([603b397](https://github.com/stacklok/codegate-ui/commit/603b397d25071ad6852f18c0cc5deb21f6fdba7c)), closes [#30](https://github.com/stacklok/codegate-ui/issues/30)

## [0.3.0](https://github.com/stacklok/codegate-ui/compare/v0.2.0...v0.3.0) (2025-01-16)

### Features

- use @stacklok/ui-kit ([#80](https://github.com/stacklok/codegate-ui/issues/80)) ([48e7103](https://github.com/stacklok/codegate-ui/commit/48e7103bb9faa32d50c24b59b937b40b2c1ab27e))

### Bug Fixes

- **alerts-table:** add clear button to input search ([#87](https://github.com/stacklok/codegate-ui/issues/87)) ([ee1ac50](https://github.com/stacklok/codegate-ui/commit/ee1ac50a5066daa8f149c590d0144f93e2c3dad8))
- **alerts-table:** trigger token box and copy to clipboard icon ([#85](https://github.com/stacklok/codegate-ui/issues/85)) ([7a0e61c](https://github.com/stacklok/codegate-ui/commit/7a0e61c62bdd0c466b529f4c1b6eb38e8fdbafef))

## [0.2.0](https://github.com/stacklok/codegate-ui/compare/v0.1.0...v0.2.0) (2025-01-15)

### Features

- make "setup" menu section less confusing ([#81](https://github.com/stacklok/codegate-ui/issues/81)) ([ae42046](https://github.com/stacklok/codegate-ui/commit/ae42046f76a08a3f7cb2ad2ba3e348b82764c7d5))

### Bug Fixes

- **alerts:** table sorting ([#82](https://github.com/stacklok/codegate-ui/issues/82)) ([8a98ec1](https://github.com/stacklok/codegate-ui/commit/8a98ec187dba98be0d4b300e4057ee8c6cba9183))
- fix basic markdown usage ([#75](https://github.com/stacklok/codegate-ui/issues/75)) ([d787eec](https://github.com/stacklok/codegate-ui/commit/d787eec17f83ff8422993ba536a1817c4a0e55f1))

## [0.1.0](https://github.com/stacklok/codegate-ui/compare/v0.0.15...v0.1.0) (2025-01-15)

### Features

- add ErrorBoundary ([#69](https://github.com/stacklok/codegate-ui/issues/69)) ([78bdfb9](https://github.com/stacklok/codegate-ui/commit/78bdfb9ef98ee9426c35c254fd4f670954c162b1))
- health check card ([#62](https://github.com/stacklok/codegate-ui/issues/62)) ([f2673bc](https://github.com/stacklok/codegate-ui/commit/f2673bcf71d2ce1850ac9ad8e861bf448ac84a91))

## [0.0.15](https://github.com/stacklok/codegate-ui/compare/v0.0.14...v0.0.15) (2025-01-15)

### Bug Fixes

- alerts line chart sorting ([#63](https://github.com/stacklok/codegate-ui/issues/63)) ([ce8146c](https://github.com/stacklok/codegate-ui/commit/ce8146c644b9a44884aba2a5b4fc0adba08a4518))
- formatting alert time in the table, add seconds ([#56](https://github.com/stacklok/codegate-ui/issues/56)) ([8d764aa](https://github.com/stacklok/codegate-ui/commit/8d764aac08329fceb2e3bc53b0ba01ef785ecf7e))
