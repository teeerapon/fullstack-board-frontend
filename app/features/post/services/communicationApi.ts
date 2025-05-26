import { Category } from '../models/Category'
import axios from '@/lib/axios';

export async function getCategoryApi(): Promise<Category[]> {
  const res = await axios.get<Category[]>('/category')
  return res.data
}
