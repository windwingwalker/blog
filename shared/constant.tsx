import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

/**
 * Front-end Path
 */
export const PATH_PREFIX = ""
export const HOME_PATH = PATH_PREFIX + "/";
export const ABOUT_PATH = PATH_PREFIX + "/about";
export const ARTICLES_PATH = PATH_PREFIX + "/articles";
export const CALCULATOR_PATH = PATH_PREFIX + "/calculator";
export const LOGIN_PATH = PATH_PREFIX + "/login";
export const CHANGE_LOG_PATH = PATH_PREFIX + "/changelog";
export const CONTRIBUTOR_PATH = PATH_PREFIX + "/contributor";
export const DASHBOARD_PATH = PATH_PREFIX + "/dashboard";
export const PAGE_NOT_FOUND_PATH = PATH_PREFIX + "/404";
export const UNKNOWN_PATH = PATH_PREFIX + "/500";
export const QNA_PATH = PATH_PREFIX + "/qna";

export const PAGE_NAV_MAPPING: {navDisplayName: string, pageHeadingDisplayName: string, icon: any, path: string, visibility: string}[] = [
  { icon: <HomeIcon />, navDisplayName: 'Home', pageHeadingDisplayName: "System Architecture", path: HOME_PATH, visibility: "both"},
  { icon: <AccountBoxIcon />, navDisplayName: 'About', pageHeadingDisplayName: "About", path: ABOUT_PATH, visibility: "both" },
  { icon: <ArticleIcon />, navDisplayName: 'Articles', pageHeadingDisplayName: "文章列表 Article List", path: ARTICLES_PATH, visibility: "both" },
  { icon: <LogoutIcon />, navDisplayName: 'Logout', pageHeadingDisplayName: "Login", path: LOGIN_PATH, visibility: "admin" },
  { icon: <LoginIcon />, navDisplayName: 'Login', pageHeadingDisplayName: "Login", path: LOGIN_PATH, visibility: "guest" },
  { icon: <CalculateIcon />, navDisplayName: 'Calculator', pageHeadingDisplayName: "Calculator", path: CALCULATOR_PATH, visibility: "admin" },
  { icon: <DashboardIcon />, navDisplayName: 'Dashboard', pageHeadingDisplayName: "Dashboard", path: DASHBOARD_PATH, visibility: "admin" },
  { icon: <ChangeHistoryIcon />, navDisplayName: 'Changelog', pageHeadingDisplayName: "Changelog", path: CHANGE_LOG_PATH, visibility: "both" },
  { icon: <PeopleAltIcon />, navDisplayName: 'Contributors', pageHeadingDisplayName: "Contributors", path: CONTRIBUTOR_PATH, visibility: "both" },
  { icon: <QuestionAnswerIcon />, navDisplayName: 'Q&A', pageHeadingDisplayName: "Q&A", path: QNA_PATH, visibility: "both"}
];

/**
 * Backend API
 */
export const DOMAIN_APEX = "windwingwalker.xyz"
export const API_DOMAIN = `api.${DOMAIN_APEX}`
export const ARTICLE_CATALOG_URL = `https://${API_DOMAIN}/article/article-catalog`;
export const ARTICLE_URL = `https://${API_DOMAIN}/article/article`;
export const ARTICLE_READER_COUNT_URL = `https://${API_DOMAIN}/article/article-reader-count`;
export const ASSET_URL = `https://${API_DOMAIN}/finance/balance`;

/**
 * General
 */
export const DRAWER_WIDTH = 240;
export const SMALL_SCREEN_MAX_WIDTH = 768;
export const LARGE_SCREEN_MIN_WIDTH = 1024;

/**
 * Color Name
 */
 export const JADEIITE = "#30716c";
 export const SAND = "#f4eddf";
 export const CARBON = "#222222";
 export const MILK = "#f5f5f5";