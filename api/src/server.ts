import db from './models'
import app from './app'

const PORT: string | 3000 = process.env.API_PORT ? process.env.API_PORT : 3000

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}).catch(err => {
  console.error('Failed to sync database:', err)
})
