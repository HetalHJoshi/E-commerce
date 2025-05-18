// import React, { useState, type FormEvent } from 'react';
// import {
//   Container,
//   Paper,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Box,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { useAuth } from '../auth/AuthContext';

// export const ProfilePage: React.FC = () => {
//   const { user, updateProfile } = useAuth();
//   const [fullName, setFullName] = useState(user?.fullName ?? '');
//   const [email, setEmail] = useState(user?.email ?? '');
//   const [saving, setSaving] = useState(false);
//   const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: 'success' | 'error' }>({
//     open: false,
//     msg: '',
//     sev: 'success',
//   });

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await updateProfile({ fullName, email });
//       setSnack({ open: true, msg: 'Profile updated!', sev: 'success' });
//     } catch (err: any) {
//       setSnack({ open: true, msg: err.message || 'Update failed', sev: 'error' });
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//         <Box display="flex" flexDirection="column" alignItems="center">
//           <Avatar sx={{ bgcolor: '#D93025', width: 64, height: 64, mb: 2, fontSize: 32 }}>
//             {user?.fullName?.[0].toUpperCase() || '?'}
//           </Avatar>
//           <Typography variant="h5">{user?.fullName}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {user?.email}
//           </Typography>
//         </Box>

//         <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
//           <Stack spacing={2}>
//             <TextField
//               label="Full Name"
//               value={fullName}
//               onChange={e => setFullName(e.target.value)}
//               fullWidth
//               required
//             />
//             <TextField
//               label="Email Address"
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               fullWidth
//               required
//             />
//             <Button variant="contained" type="submit" disabled={saving}>
//               {saving ? 'Saving…' : 'Save Changes'}
//             </Button>
//           </Stack>
//         </Box>
//       </Paper>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         onClose={() => setSnack(s => ({ ...s, open: false }))}
//       >
//         <Alert severity={snack.sev} variant="filled">
//           {snack.msg}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// src/pages/ProfilePage.tsx
import React, { useState, type FormEvent } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { getFromLocalStorage, setToLocalStorage } from '../../utils/storageUtils';
import type { User } from '../../types/User/types';

export const ProfilePage: React.FC = () => {
  // load the current user once, then drive everything off local state
  const storedUser = getFromLocalStorage<User>('currentUser');
  const [fullName, setFullName] = useState(storedUser?.fullName ?? '');
  const [email, setEmail] = useState(storedUser?.email ?? '');
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: 'success' | 'error' }>({
    open: false,
    msg: '',
    sev: 'success',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!storedUser) {
      setSnack({ open: true, msg: 'No user found to update', sev: 'error' });
      return;
    }

    setSaving(true);
    try {
      // 1) update the master "users" array in LS
      const allUsers = getFromLocalStorage<User[]>('users') ?? [];
      const updatedUsers = allUsers.map(u =>
        u.email === storedUser.email ? { ...u, fullName, email } : u,
      );
      setToLocalStorage('users', updatedUsers);

      // 2) replace currentUser in LS
      const updatedUser: User = { ...storedUser, fullName, email };
      setToLocalStorage('currentUser', updatedUser);

      setSnack({ open: true, msg: 'Profile updated!', sev: 'success' });
    } catch (err: any) {
      setSnack({ open: true, msg: err.message || 'Update failed', sev: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#D93025', width: 64, height: 64, mb: 2, fontSize: 32 }}>
            {fullName?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <Typography variant="h5">{fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
      >
        <Alert severity={snack.sev} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
};
