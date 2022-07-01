module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  rules: {
    'unit-no-unknown': [
      true,
      {
        ignoreFunctions: ['image-set', 'X'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'property-no-unknown': null,
    'function-calc-no-invalid': null,
    'no-invalid-position-at-import-rule': null,
  },
};
