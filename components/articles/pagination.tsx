import { PaginationItem, Pagination, Box, Toolbar, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { setCurrentPage } from '../../shared/articleSlice';

interface Props{
  maxPage: number,
  currentPage: number
}

const MyPagination: React.FC<Props> = ({maxPage}) => {
  const dispatch = useAppDispatch();
  const currentPage: number = useAppSelector((state: any) => state.article.currentPage)
  
  const handleChange = (event: any, value: any) => {
    dispatch(setCurrentPage(value)); 
  }

  return (
    <Pagination page={currentPage} count={maxPage} variant="outlined" color="jadeite" onChange={handleChange}/>
  )
}

export default MyPagination;