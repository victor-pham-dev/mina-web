module.exports = {
  printWidth: 100, // Số lượng ký tự tối đa trên mỗi dòng
  tabWidth: 2, // Số lượng ký tự tương ứng với 1 tab
  useTabs: false, // Sử dụng space thay vì tab
  semi: false, // Thêm dấu chấm phẩy vào cuối mỗi dòng
  singleQuote: true, // Sử dụng dấu nháy đơn thay vì nháy kép
  trailingComma: 'all', // Thêm dấu phẩy vào cuối danh sách khi có thể
  bracketSpacing: true, // Thêm khoảng trắng vào trước và sau dấu ngoặc đơn
  arrowParens: 'always', // Thêm dấu ngoặc vào đối số của hàm arrow
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        // Thêm các cấu hình riêng cho TypeScript tại đây (nếu có)
      },
    },
  ],
};
