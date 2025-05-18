// // import React, { useState, type MouseEvent } from 'react';
// // import {
// //   IconButton,
// //   Avatar,
// //   Menu,
// //   MenuItem,
// //   Box,
// //   Typography,
// //   Divider,
// //   ListItemIcon,
// // } from '@mui/material';
// // import PersonIcon from '@mui/icons-material/Person';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// // import { useAuth } from '../auth/AuthContext';
// // import { useNavigate } from 'react-router-dom';

// // export const UserMenu: React.FC = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const open = Boolean(anchorEl);
// //   const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
// //   const handleClose = () => setAnchorEl(null);
// //   const handleLogout = () => {
// //     logout();
// //     handleClose();
// //     navigate('/signin', { replace: true });
// //   };
// //   const initial = user?.fullName?.[0]?.toUpperCase() ?? '';

// //   return (
// //     <>
// //       <IconButton color="inherit" onClick={handleOpen} size="large">
// //         {initial ? (
// //           <Avatar sx={{ bgcolor: '#D93025', color: '#fff', width: 32, height: 32, fontSize: 16 }}>
// //             {initial}
// //           </Avatar>
// //         ) : (
// //           <AccountCircleIcon fontSize="large" />
// //         )}
// //       </IconButton>

// //       <Menu
// //         anchorEl={anchorEl}
// //         open={open}
// //         onClose={handleClose}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
// //         PaperProps={{
// //           elevation: 4,
// //           sx: {
// //             mt: 1,
// //             borderRadius: 2,
// //             minWidth: 200,
// //             boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
// //             py: 0.5,
// //           },
// //         }}
// //         MenuListProps={{ dense: true, sx: { p: 0 } }}
// //       >
// //         <Box sx={{ px: 2, py: 1 }}>
// //           <Typography variant="subtitle2" noWrap>
// //             {user?.fullName}
// //           </Typography>
// //           <Typography variant="caption" color="text.secondary" noWrap>
// //             {user?.email}
// //           </Typography>
// //         </Box>
// //         <Divider sx={{ my: 0.5 }} />

// //         <MenuItem
// //           onClick={() => {
// //             handleClose();
// //             navigate('/profile');
// //           }}
// //           disableRipple
// //           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
// //         >
// //           <ListItemIcon>
// //             <PersonIcon fontSize="small" />
// //           </ListItemIcon>
// //           Profile
// //         </MenuItem>

// //         <MenuItem
// //           onClick={handleLogout}
// //           disableRipple
// //           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
// //         >
// //           <ListItemIcon>
// //             <LogoutIcon fontSize="small" />
// //           </ListItemIcon>
// //           Logout
// //         </MenuItem>
// //       </Menu>
// //     </>
// //   );
// // };

// // src/components/UserMenu.tsx
// import React, { useState, type MouseEvent } from 'react';
// import {
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Box,
//   Typography,
//   Divider,
//   ListItemIcon,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';
// import { getFromLocalStorage } from '../../utils/storageUtils';
// import type { User } from '../../types/User/types';

// export const UserMenu: React.FC = () => {
//   // 1) load the current user directly from localStorage
//   const storedUser = getFromLocalStorage<User>('currentUser');

//   // 2) local state for the menu anchor
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const navigate = useNavigate();

//   const handleOpen = (e: MouseEvent<HTMLElement>) => {
//     setAnchorEl(e.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // 3) new, in-place logout logic
//   // const handleLogout = () => {
//   //   // remove the single “currentUser” entry
//   //   localStorage.removeItem('currentUser');

//   //   // (optionally) if you track a list of users and want to clear a flag,
//   //   // you could also read/write that here via storageUtils

//   //   handleClose();
//   //   // send them back to the sign-in page
//   //   navigate('/signin', { replace: true });
//   // };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     handleClose();
//     window.location.href = '/signin'; // changed from navigate()
//   };

//   // 4) derive the avatar initial from what we loaded
//   const initial = storedUser?.fullName?.[0]?.toUpperCase() ?? '';

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleOpen} size="large">
//         {initial ? (
//           <Avatar sx={{ bgcolor: '#D93025', color: '#fff', width: 32, height: 32, fontSize: 16 }}>
//             {initial}
//           </Avatar>
//         ) : (
//           <AccountCircleIcon fontSize="large" />
//         )}
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1,
//             borderRadius: 2,
//             minWidth: 200,
//             boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
//             py: 0.5,
//           },
//         }}
//         MenuListProps={{ dense: true, sx: { p: 0 } }}
//       >
//         <Box sx={{ px: 2, py: 1 }}>
//           <Typography variant="subtitle2" noWrap>
//             {storedUser?.fullName}
//           </Typography>
//           <Typography variant="caption" color="text.secondary" noWrap>
//             {storedUser?.email}
//           </Typography>
//         </Box>
//         <Divider sx={{ my: 0.5 }} />

//         <MenuItem
//           onClick={() => {
//             handleClose();
//             navigate('/profile');
//           }}
//           disableRipple
//           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
//         >
//           <ListItemIcon>
//             <PersonIcon fontSize="small" />
//           </ListItemIcon>
//           Profile
//         </MenuItem>

//         <MenuItem
//           onClick={handleLogout}
//           disableRipple
//           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
//         >
//           <ListItemIcon>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };
// src/components/UserMenu.tsx
// import React, { useState, useRef, type MouseEvent } from 'react';
// import {
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Box,
//   Typography,
//   Divider,
//   ListItemIcon,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';

// export const UserMenu: React.FC = () => {
//   const { user, setUser } = useAuth();

//   // menu anchor
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   // snackbar + timer ref
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const timerRef = useRef<number | null>(null);

//   const navigate = useNavigate();

//   const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   // actual logout + redirect
//   const logoutNow = () => {
//     localStorage.removeItem('currentUser');
//     setUser(null);
//     navigate('/signin', { replace: true });
//   };

//   const handleLogout = () => {
//     handleClose();
//     setSnackbarOpen(true);
//     // schedule real logout after 3s
//     timerRef.current = window.setTimeout(logoutNow, 3000);
//   };

//   const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') return;
//     setSnackbarOpen(false);
//     // if closed early, cancel timer & logout immediately
//     if (timerRef.current !== null) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//       logoutNow();
//     }
//   };

//   const initial = user?.fullName?.[0]?.toUpperCase() ?? '';

//   return (
//     <>
//       <IconButton color="inherit" onClick={handleOpen} size="large">
//         {initial ? (
//           <Avatar sx={{ bgcolor: '#D93025', color: '#fff', width: 32, height: 32, fontSize: 16 }}>
//             {initial}
//           </Avatar>
//         ) : (
//           <AccountCircleIcon fontSize="large" />
//         )}
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1,
//             borderRadius: 2,
//             minWidth: 200,
//             boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
//             py: 0.5,
//           },
//         }}
//         MenuListProps={{ dense: true, sx: { p: 0 } }}
//       >
//         <Box sx={{ px: 2, py: 1 }}>
//           <Typography variant="subtitle2" noWrap>
//             {user?.fullName}
//           </Typography>
//           <Typography variant="caption" color="text.secondary" noWrap>
//             {user?.email}
//           </Typography>
//         </Box>
//         <Divider sx={{ my: 0.5 }} />

//         <MenuItem
//           onClick={() => {
//             handleClose();
//             navigate('/profile');
//           }}
//           disableRipple
//           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
//         >
//           <ListItemIcon>
//             <PersonIcon fontSize="small" />
//           </ListItemIcon>
//           Profile
//         </MenuItem>

//         <MenuItem
//           onClick={handleLogout}
//           disableRipple
//           sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
//         >
//           <ListItemIcon>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           Logout successful!
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// src/components/UserMenu.tsx
import React, { useState, useRef, type MouseEvent } from 'react';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  Snackbar,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const UserMenu: React.FC = () => {
  const { user, setUser } = useAuth();

  // menu anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // snackbar + timer ref
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const navigate = useNavigate();

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // actual logout + redirect
  const logoutNow = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/signin', { replace: true });
  };

  const handleLogout = () => {
    handleClose();
    setSnackbarOpen(true);
    // schedule real logout after 3s
    timerRef.current = window.setTimeout(logoutNow, 3000);
  };

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);

    // if user closed early, cancel timer & logout immediately
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      logoutNow();
    }
  };

  const initial = user?.fullName?.[0]?.toUpperCase() ?? '';

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} size="large">
        {initial ? (
          <Avatar
            sx={{
              bgcolor: '#D93025',
              color: '#fff',
              width: 32,
              height: 32,
              fontSize: 16,
            }}
          >
            {initial}
          </Avatar>
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          // replaces deprecated PaperProps
          paper: {
            elevation: 4,
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              py: 0.5,
            },
          },
          // you can also move the MenuListProps here
          list: {
            dense: true,
            sx: { p: 0 },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/profile');
          }}
          disableRipple
          sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          disableRipple
          sx={{ px: 2, py: 1, '&:hover': { bgcolor: 'action.hover' } }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Logout successful!
        </Alert>
      </Snackbar>
    </>
  );
};
