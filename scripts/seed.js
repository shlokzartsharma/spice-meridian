const { execSync } = require('child_process')
const path = require('path')

console.log('🌱 Running database seeding...')

try {
  // Run the TypeScript seeding script
  execSync('npx tsx src/lib/seed.ts', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  
  console.log('✅ Seeding completed successfully!')
} catch (error) {
  console.error('❌ Seeding failed:', error.message)
  process.exit(1)
} 