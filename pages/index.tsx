// import React from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   alpha,
// } from '@mui/material';
// import { useRouter } from 'next/router';
// import { East, Schedule, Groups, AdminPanelSettings } from '@mui/icons-material';
// import Layout from '@/components/layout/Layout';

// const Home: React.FC = () => {
//   const router = useRouter();

//   return (
//     <Layout>
//       <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
//         {/* Hero Section */}
//         <Box
//           sx={{
//             textAlign: 'center',
//             py: { xs: 8, md: 15 },
//             background: `
//               linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #ffffff 100%),
//               url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dc143c' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")
//             `,
//             borderRadius: 4,
//             mb: 10,
//             px: 4,
//             border: '1px solid #e0e0e0',
//             position: 'relative',
//             overflow: 'hidden',
//             boxShadow: '0 20px 60px rgba(220, 20, 60, 0.1)',
//           }}
//         >
//           <Typography
//             variant="h1"
//             component="h1"
//             gutterBottom
//             sx={{
//               fontWeight: 700,
//               mb: 3,
//               position: 'relative',
//               zIndex: 1,
//               fontSize: { xs: '2.5rem', md: '4rem' },
//               background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 50%, #dc143c 100%)',
//               backgroundClip: 'text',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               textShadow: '0 4px 20px rgba(220, 20, 60, 0.2)',
//             }}
//           >
//             Interview Elegance
//           </Typography>
//           <Typography
//             variant="h5"
//             component="p"
//             sx={{
//               color: '#666666',
//               mb: 6,
//               maxWidth: '700px',
//               mx: 'auto',
//               position: 'relative',
//               zIndex: 1,
//               fontWeight: 400,
//               lineHeight: 1.6,
//               fontSize: { xs: '1.2rem', md: '1.5rem' },
//             }}
//           >
//             Transform your interview process with our sophisticated reservation system. 
//             Where precision meets elegance for candidates, recruiters, and administrators.
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
//             <Button
//               variant="contained"
//               size="large"
//               onClick={() => router.push('/auth/register')}
//               sx={{
//                 px: 6,
//                 py: 2,
//                 fontSize: '1.1rem',
//                 background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//                 border: '1px solid #e3334d',
//                 boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
//                 color: '#ffffff',
//                 fontWeight: 600,
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                   boxShadow: '0 12px 40px rgba(220, 20, 60, 0.5)',
//                   transform: 'translateY(-2px)',
//                 },
//                 transition: 'all 0.3s ease',
//               }}
//               endIcon={<East />}
//             >
//               Begin Journey
//             </Button>
//             <Button
//               variant="outlined"
//               size="large"
//               onClick={() => router.push('/auth/login')}
//               sx={{
//                 px: 6,
//                 py: 2,
//                 fontSize: '1.1rem',
//                 borderColor: '#dc143c',
//                 color: '#dc143c',
//                 fontWeight: 600,
//                 '&:hover': {
//                   borderColor: '#e3334d',
//                   backgroundColor: alpha('#dc143c', 0.04),
//                   transform: 'translateY(-2px)',
//                 },
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               Enter Portal
//             </Button>
//           </Box>
//         </Box>

//         {/* Features Section */}
//         <Grid container spacing={4} sx={{ mb: 12 }}>
//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%',
//                 background: '#ffffff',
//                 border: '1px solid #f0f0f0',
//                 transition: 'all 0.4s ease',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '4px',
//                   background: 'linear-gradient(90deg, #dc143c, #e3334d)',
//                 },
//                 '&:hover': {
//                   transform: 'translateY(-12px)',
//                   boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
//                   '& .feature-icon': {
//                     transform: 'scale(1.1) rotate(5deg)',
//                     background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//                   },
//                 },
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
//                 <Box
//                   className="feature-icon"
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 4,
//                     border: '3px solid #ffffff',
//                     transition: 'all 0.4s ease',
//                     boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
//                   }}
//                 >
//                   <Schedule sx={{ fontSize: 48, color: '#ffffff' }} />
//                 </Box>
//                 <Typography 
//                   variant="h5" 
//                   gutterBottom 
//                   sx={{ 
//                     color: '#333333', 
//                     mb: 3,
//                     fontWeight: 600,
//                     fontSize: '1.5rem',
//                   }}
//                 >
//                   For Candidates
//                 </Typography>
//                 <Typography 
//                   variant="body1" 
//                   sx={{ 
//                     color: '#666666', 
//                     mb: 4, 
//                     lineHeight: 1.8,
//                     fontSize: '1rem',
//                     fontWeight: 400,
//                   }}
//                 >
//                   Discover and reserve interview times that align with your journey. 
//                   Experience seamless scheduling with elegant precision and timely reminders.
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   onClick={() => router.push('/auth/register?role=candidate')}
//                   sx={{
//                     borderColor: '#dc143c',
//                     color: '#dc143c',
//                     px: 4,
//                     py: 1,
//                     fontWeight: 600,
//                     '&:hover': {
//                       backgroundColor: alpha('#dc143c', 0.04),
//                       borderColor: '#e3334d',
//                       transform: 'translateX(4px)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                   endIcon={<East />}
//                 >
//                   Join as Candidate
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%',
//                 background: '#ffffff',
//                 border: '1px solid #f0f0f0',
//                 transition: 'all 0.4s ease',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '4px',
//                   background: 'linear-gradient(90deg, #dc143c, #e3334d)',
//                 },
//                 '&:hover': {
//                   transform: 'translateY(-12px)',
//                   boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
//                   '& .feature-icon': {
//                     transform: 'scale(1.1) rotate(5deg)',
//                     background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//                   },
//                 },
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
//                 <Box
//                   className="feature-icon"
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 4,
//                     border: '3px solid #ffffff',
//                     transition: 'all 0.4s ease',
//                     boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
//                   }}
//                 >
//                   <Groups sx={{ fontSize: 48, color: '#ffffff' }} />
//                 </Box>
//                 <Typography 
//                   variant="h5" 
//                   gutterBottom 
//                   sx={{ 
//                     color: '#333333', 
//                     mb: 3,
//                     fontWeight: 600,
//                     fontSize: '1.5rem',
//                   }}
//                 >
//                   For Recruiters
//                 </Typography>
//                 <Typography 
//                   variant="body1" 
//                   sx={{ 
//                     color: '#666666', 
//                     mb: 4, 
//                     lineHeight: 1.8,
//                     fontSize: '1rem',
//                     fontWeight: 400,
//                   }}
//                 >
//                   Curate exceptional interview experiences with precision and grace. 
//                   Manage schedules efficiently while maintaining the highest standards.
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   onClick={() => router.push('/auth/register?role=recruiter')}
//                   sx={{
//                     borderColor: '#dc143c',
//                     color: '#dc143c',
//                     px: 4,
//                     py: 1,
//                     fontWeight: 600,
//                     '&:hover': {
//                       backgroundColor: alpha('#dc143c', 0.04),
//                       borderColor: '#e3334d',
//                       transform: 'translateX(4px)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                   endIcon={<East />}
//                 >
//                   Join as Recruiter
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card 
//               sx={{ 
//                 height: '100%',
//                 background: '#ffffff',
//                 border: '1px solid #f0f0f0',
//                 transition: 'all 0.4s ease',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: '4px',
//                   background: 'linear-gradient(90deg, #dc143c, #e3334d)',
//                 },
//                 '&:hover': {
//                   transform: 'translateY(-12px)',
//                   boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
//                   '& .feature-icon': {
//                     transform: 'scale(1.1) rotate(5deg)',
//                     background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//                   },
//                 },
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
//                 <Box
//                   className="feature-icon"
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mx: 'auto',
//                     mb: 4,
//                     border: '3px solid #ffffff',
//                     transition: 'all 0.4s ease',
//                     boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
//                   }}
//                 >
//                   <AdminPanelSettings sx={{ fontSize: 48, color: '#ffffff' }} />
//                 </Box>
//                 <Typography 
//                   variant="h5" 
//                   gutterBottom 
//                   sx={{ 
//                     color: '#333333', 
//                     mb: 3,
//                     fontWeight: 600,
//                     fontSize: '1.5rem',
//                   }}
//                 >
//                   For Administrators
//                 </Typography>
//                 <Typography 
//                   variant="body1" 
//                   sx={{ 
//                     color: '#666666', 
//                     mb: 4, 
//                     lineHeight: 1.8,
//                     fontSize: '1rem',
//                     fontWeight: 400,
//                   }}
//                 >
//                   Oversee the harmonious operation of the entire ecosystem. 
//                   Ensure every interaction reflects our commitment to excellence.
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   onClick={() => router.push('/auth/login')}
//                   sx={{
//                     borderColor: '#dc143c',
//                     color: '#dc143c',
//                     px: 4,
//                     py: 1,
//                     fontWeight: 600,
//                     '&:hover': {
//                       backgroundColor: alpha('#dc143c', 0.04),
//                       borderColor: '#e3334d',
//                       transform: 'translateX(4px)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                   endIcon={<East />}
//                 >
//                   Admin Portal
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Stats Section */}
//         <Box
//           sx={{
//             background: `
//               linear-gradient(135deg, #ffffff 0%, #fafafa 100%),
//               url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc143c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
//             `,
//             borderRadius: 4,
//             p: { xs: 4, md: 8 },
//             border: '1px solid #f0f0f0',
//             mb: 10,
//             position: 'relative',
//             overflow: 'hidden',
//             boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
//           }}
//         >
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={7}>
//               <Typography 
//                 variant="h3" 
//                 gutterBottom 
//                 sx={{ 
//                   color: '#333333', 
//                   mb: 3,
//                   fontWeight: 700,
//                   lineHeight: 1.3,
//                   fontSize: { xs: '2rem', md: '2.5rem' },
//                 }}
//               >
//                 Excellence in Every Interaction
//               </Typography>
//               <Typography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#666666', 
//                   mb: 4, 
//                   lineHeight: 1.8,
//                   fontSize: '1.1rem',
//                   fontWeight: 400,
//                 }}
//               >
//                 Experience the perfect harmony of sophisticated design and modern technology. 
//                 Our platform embodies precision and elegance, transforming every interview 
//                 into an exceptional experience for all participants.
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//                 <Button
//                   variant="contained"
//                   onClick={() => router.push('/auth/register')}
//                   sx={{
//                     background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//                     border: '1px solid #e3334d',
//                     color: '#ffffff',
//                     px: 4,
//                     py: 1.5,
//                     fontWeight: 600,
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                       transform: 'translateY(-2px)',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                   endIcon={<East />}
//                 >
//                   Start Free Trial
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={() => router.push('/about')}
//                   sx={{
//                     borderColor: '#dc143c',
//                     color: '#dc143c',
//                     px: 4,
//                     py: 1.5,
//                     fontWeight: 600,
//                     '&:hover': {
//                       backgroundColor: alpha('#dc143c', 0.04),
//                       borderColor: '#e3334d',
//                     },
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   Learn More
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={5}>
//               <Box
//                 sx={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: 4,
//                   textAlign: 'center',
//                 }}
//               >
//                 {[
//                   { number: '99.9%', label: 'Satisfaction Rate', color: '#dc143c' },
//                   { number: '10K+', label: 'Interviews', color: '#e3334d' },
//                   { number: '24/7', label: 'Premium Support', color: '#dc143c' },
//                   { number: '50+', label: 'Enterprise Clients', color: '#e3334d' },
//                 ].map((stat, index) => (
//                   <Box key={index} sx={{ position: 'relative' }}>
//                     <Typography 
//                       variant="h2" 
//                       sx={{ 
//                         color: stat.color,
//                         fontWeight: 700,
//                         mb: 1,
//                         fontSize: { xs: '2rem', md: '2.5rem' },
//                         textShadow: '0 2px 10px rgba(220, 20, 60, 0.2)',
//                       }}
//                     >
//                       {stat.number}
//                     </Typography>
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         color: '#666666',
//                         fontWeight: 500,
//                         fontSize: '0.9rem',
//                       }}
//                     >
//                       {stat.label}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Final CTA */}
//         <Box
//           sx={{
//             textAlign: 'center',
//             py: { xs: 6, md: 10 },
//             background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
//             borderRadius: 4,
//             border: '1px solid #e0e0e0',
//             position: 'relative',
//             overflow: 'hidden',
//             boxShadow: '0 15px 50px rgba(220, 20, 60, 0.1)',
//           }}
//         >
//           <Typography 
//             variant="h3" 
//             gutterBottom 
//             sx={{ 
//               color: '#333333', 
//               mb: 3,
//               fontWeight: 700,
//               fontSize: { xs: '2rem', md: '2.5rem' },
//               position: 'relative',
//               zIndex: 1,
//             }}
//           >
//             Ready to Elevate Your Interview Experience?
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               color: '#666666', 
//               mb: 6, 
//               fontWeight: 400,
//               position: 'relative',
//               zIndex: 1,
//               fontSize: { xs: '1.1rem', md: '1.3rem' },
//             }}
//           >
//             Join forward-thinking organizations that value precision, elegance, and results
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={() => router.push('/auth/register')}
//             sx={{
//               px: 8,
//               py: 2,
//               fontSize: '1.1rem',
//               background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
//               border: '1px solid #e3334d',
//               boxShadow: '0 12px 40px rgba(220, 20, 60, 0.3)',
//               color: '#ffffff',
//               fontWeight: 600,
//               position: 'relative',
//               zIndex: 1,
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
//                 boxShadow: '0 16px 50px rgba(220, 20, 60, 0.5)',
//                 transform: 'translateY(-2px)',
//               },
//               transition: 'all 0.3s ease',
//             }}
//             endIcon={<East />}
//           >
//             Begin Your Journey
//           </Button>
//         </Box>
//       </Container>
//     </Layout>
//   );
// };

// export default Home;



import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  alpha,
} from '@mui/material';
import { useRouter } from 'next/router';
import { East, Schedule, Groups, AdminPanelSettings } from '@mui/icons-material';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 15 },
          background: `
            linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #ffffff 100%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dc143c' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")
          `,
          borderRadius: 4,
          mb: 10,
          px: 4,
          border: '1px solid #e0e0e0',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(220, 20, 60, 0.1)',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '2.5rem', md: '4rem' },
            background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 50%, #dc143c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(220, 20, 60, 0.2)',
          }}
        >
          Interview Elegance
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: '#666666',
            mb: 6,
            maxWidth: '700px',
            mx: 'auto',
            position: 'relative',
            zIndex: 1,
            fontWeight: 400,
            lineHeight: 1.6,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
          }}
        >
          Transform your interview process with our sophisticated reservation system. 
          Where precision meets elegance for candidates, recruiters, and administrators.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/auth/register')}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
              border: '1px solid #e3334d',
              boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
              color: '#ffffff',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
                boxShadow: '0 12px 40px rgba(220, 20, 60, 0.5)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
            endIcon={<East />}
          >
            Begin Journey
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/auth/login')}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              borderColor: '#dc143c',
              color: '#dc143c',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#e3334d',
                backgroundColor: alpha('#dc143c', 0.04),
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Enter Portal
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 12 }}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              background: '#ffffff',
              border: '1px solid #f0f0f0',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #dc143c, #e3334d)',
              },
              '&:hover': {
                transform: 'translateY(-12px)',
                boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
                '& .feature-icon': {
                  transform: 'scale(1.1) rotate(5deg)',
                  background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
                },
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
              <Box
                className="feature-icon"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  border: '3px solid #ffffff',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
                }}
              >
                <Schedule sx={{ fontSize: 48, color: '#ffffff' }} />
              </Box>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#333333', 
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              >
                For Candidates
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666666', 
                  mb: 4, 
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  fontWeight: 400,
                }}
              >
                Discover and reserve interview times that align with your journey. 
                Experience seamless scheduling with elegant precision and timely reminders.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/auth/register?role=candidate')}
                sx={{
                  borderColor: '#dc143c',
                  color: '#dc143c',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: alpha('#dc143c', 0.04),
                    borderColor: '#e3334d',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                endIcon={<East />}
              >
                Join as Candidate
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              background: '#ffffff',
              border: '1px solid #f0f0f0',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #dc143c, #e3334d)',
              },
              '&:hover': {
                transform: 'translateY(-12px)',
                boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
                '& .feature-icon': {
                  transform: 'scale(1.1) rotate(5deg)',
                  background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
                },
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
              <Box
                className="feature-icon"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  border: '3px solid #ffffff',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
                }}
              >
                <Groups sx={{ fontSize: 48, color: '#ffffff' }} />
              </Box>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#333333', 
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              >
                For Recruiters
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666666', 
                  mb: 4, 
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  fontWeight: 400,
                }}
              >
                Curate exceptional interview experiences with precision and grace. 
                Manage schedules efficiently while maintaining the highest standards.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/auth/register?role=recruiter')}
                sx={{
                  borderColor: '#dc143c',
                  color: '#dc143c',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: alpha('#dc143c', 0.04),
                    borderColor: '#e3334d',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                endIcon={<East />}
              >
                Join as Recruiter
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              background: '#ffffff',
              border: '1px solid #f0f0f0',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #dc143c, #e3334d)',
              },
              '&:hover': {
                transform: 'translateY(-12px)',
                boxShadow: '0 20px 60px rgba(220, 20, 60, 0.15)',
                '& .feature-icon': {
                  transform: 'scale(1.1) rotate(5deg)',
                  background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
                },
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 5, position: 'relative', zIndex: 1 }}>
              <Box
                className="feature-icon"
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  border: '3px solid #ffffff',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
                }}
              >
                <AdminPanelSettings sx={{ fontSize: 48, color: '#ffffff' }} />
              </Box>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#333333', 
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              >
                For Administrators
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666666', 
                  mb: 4, 
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  fontWeight: 400,
                }}
              >
                Oversee the harmonious operation of the entire ecosystem. 
                Ensure every interaction reflects our commitment to excellence.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => router.push('/auth/login')}
                sx={{
                  borderColor: '#dc143c',
                  color: '#dc143c',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: alpha('#dc143c', 0.04),
                    borderColor: '#e3334d',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                endIcon={<East />}
              >
                Admin Portal
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Box
        sx={{
          background: `
            linear-gradient(135deg, #ffffff 0%, #fafafa 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc143c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          borderRadius: 4,
          p: { xs: 4, md: 8 },
          border: '1px solid #f0f0f0',
          mb: 10,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                color: '#333333', 
                mb: 3,
                fontWeight: 700,
                lineHeight: 1.3,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Excellence in Every Interaction
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666666', 
                mb: 4, 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                fontWeight: 400,
              }}
            >
              Experience the perfect harmony of sophisticated design and modern technology. 
              Our platform embodies precision and elegance, transforming every interview 
              into an exceptional experience for all participants.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => router.push('/auth/register')}
                sx={{
                  background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
                  border: '1px solid #e3334d',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                endIcon={<East />}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push('/about')}
                sx={{
                  borderColor: '#dc143c',
                  color: '#dc143c',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: alpha('#dc143c', 0.04),
                    borderColor: '#e3334d',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 4,
                textAlign: 'center',
              }}
            >
              {[
                { number: '99.9%', label: 'Satisfaction Rate', color: '#dc143c' },
                { number: '10K+', label: 'Interviews', color: '#e3334d' },
                { number: '24/7', label: 'Premium Support', color: '#dc143c' },
                { number: '50+', label: 'Enterprise Clients', color: '#e3334d' },
              ].map((stat, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      color: stat.color,
                      fontWeight: 700,
                      mb: 1,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      textShadow: '0 2px 10px rgba(220, 20, 60, 0.2)',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666666',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
          borderRadius: 4,
          border: '1px solid #e0e0e0',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 15px 50px rgba(220, 20, 60, 0.1)',
        }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            color: '#333333', 
            mb: 3,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            position: 'relative',
            zIndex: 1,
          }}
        >
          Ready to Elevate Your Interview Experience?
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#666666', 
            mb: 6, 
            fontWeight: 400,
            position: 'relative',
            zIndex: 1,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
          }}
        >
          Join forward-thinking organizations that value precision, elegance, and results
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/auth/register')}
          sx={{
            px: 8,
            py: 2,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #dc143c 0%, #e3334d 100%)',
            border: '1px solid #e3334d',
            boxShadow: '0 12px 40px rgba(220, 20, 60, 0.3)',
            color: '#ffffff',
            fontWeight: 600,
            position: 'relative',
            zIndex: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, #e3334d 0%, #dc143c 100%)',
              boxShadow: '0 16px 50px rgba(220, 20, 60, 0.5)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
          endIcon={<East />}
        >
          Begin Your Journey
        </Button>
      </Box>
    </Container>
  );
};

export default Home;