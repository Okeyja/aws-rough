export default {
  key: 's3',
  name: 'S3',
  href: '/s3/',
  description: 'ストレージ',
  color: 'red',
  multiple: false,
  table: [
    {
      type: 'number',
      key: 'storage',
      title: '容量(GB)'
    },
    {
      type: 'number',
      key: 'transfer',
      title: 'データ転送量(GB)',
      size: 'large'
    },
    {
      type: 'number',
      key: 'read',
      title: '読み込み回数'
    },
    {
      type: 'number',
      key: 'write',
      title: '書き込み回数'
    }
  ]
}
