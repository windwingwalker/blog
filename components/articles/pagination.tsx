import { Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { setCurrentPage } from '../../shared/articleSlice';
import React from 'react';

interface Props{
  maxPage: number;
  currentPage: number;
}

const MyPagination: React.FC<Props> = ({maxPage}) => {
  const dispatch = useAppDispatch();
  const currentPage: number = useAppSelector(state => state.article.currentPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  }

  return (
    <Pagination page={currentPage} count={maxPage} variant="outlined" color="jadeite" onChange={handleChange}/>
  )
}

export default MyPagination;