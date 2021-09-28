const vueParser = require('../../index');

const ast = vueParser.parse(`
  <template>
    <page-container
    title="{{ pageTitle }}" titleColor="#fff" titleBgColor="transparent"
    loading="{{ loading }}" expError="{{ error }}" onExpBtnHandle="onExpBtnRefresh"
    >
    <!-- <coupon-list
      navBar="{{ true }}" showCategory="{{ showCategory }}"
      gotoText="{{ gotoText }}" color="{{ couponColor }}"
    /> -->
    </page-container>
  </template>
`);

if (ast.templateBody && ast.templateBody.errors.length > 0) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(ast.templateBody.errors));
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log('ast', ast);

ast.templateBody.tokens.forEach(token => {
  // eslint-disable-next-line no-console
  console.log('token', token);
});