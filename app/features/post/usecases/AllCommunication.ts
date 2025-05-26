import { getCategoryApi } from '../services/communicationApi'
import { Category } from '../models/Category'

export async function GetAllCategory(): Promise<Category[]> {
  return await getCategoryApi()
}
