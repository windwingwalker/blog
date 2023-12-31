import { ArticleCatalog, ArticleMetadata } from '../models/article';

export const filterArticlesByTags = (articleMetadataList: ArticleMetadata[], tagsSelected: string[]): ArticleMetadata[] => {
  if (tagsSelected.length == 0) return articleMetadataList;

  articleMetadataList = articleMetadataList.filter((articleMetadata: ArticleMetadata) => articleMetadata["tags"] != null)

  articleMetadataList = articleMetadataList.filter((articleMetadata: ArticleMetadata) => {
    if (articleMetadata["tags"]!.length == 1){
      return tagsSelected.includes(articleMetadata["tags"]![0]) 
    }
    if (articleMetadata["tags"]!.length == 2){
      return tagsSelected.includes(articleMetadata["tags"]![0]) || tagsSelected.includes(articleMetadata["tags"]![1]) 
    }
    if (articleMetadata["tags"]!.length == 3){
      return tagsSelected.includes(articleMetadata["tags"]![0]) || tagsSelected.includes(articleMetadata["tags"]![1]) || tagsSelected.includes(articleMetadata["tags"]![2]) 
    }
  });
  return articleMetadataList;
}

export const getDateFromUnix = (unixTime: number, timezoneOffset: number) => {
  // Create a date object using the Unix timestamp
  var date = new Date(unixTime);

  // Convert the date object to UTC by adding the timezone offset of the local timezone
  var utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  // Adjust the date by the desired timezone offset (in hours)
  // For example, for EST (UTC-5) you can pass -5 as timezoneOffset
  var targetDate = new Date(utcDate.getTime() + timezoneOffset * 3600000);

  // Format the date as you like
  const value = targetDate.toDateString().split(' ');
  return value[2] + " " + value[1] + " " + value[3];
};

export const getArticlesOfCurrentPage = (articleMetadataList: ArticleMetadata[], currentPage: number, articleAmountPerPage: number): ArticleMetadata[] => {
  var res: ArticleMetadata[] = []; 
  const offset: number = (currentPage - 1) * articleAmountPerPage
  const end: number = articleAmountPerPage > articleMetadataList.length - offset ? articleMetadataList.length : offset + articleAmountPerPage
  for (var i = offset; i < end; i++){
    res.push(articleMetadataList[i]);
  }
  return res;
}

export const getMaxPageNumber = (totalArticleAmount: number, articleAmountPerPage: number) => {
  var res = Math.floor(totalArticleAmount / articleAmountPerPage);

  return totalArticleAmount % articleAmountPerPage == 0 ? res : res + 1;
}