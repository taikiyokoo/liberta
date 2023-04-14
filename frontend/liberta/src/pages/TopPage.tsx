import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import { makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/router';



const CustomButton = styled(Button)`
  margin: 16px;
  width: 200px;
  height: 60px;
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: #eeeeee;
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #dddddd;
    transform: translateY(0);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:focus-visible {
    background-color: #cccccc;
    outline: 2px solid #000000;
  }
`;



const useTypingAnimation = (text:any, typingSpeed:any, shouldStart:any) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!shouldStart) {
      return;
    }

    let currentIndex = -1;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length - 1) {
          setTypedText((prevTypedText) => prevTypedText + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);
    }, typingSpeed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, typingSpeed, shouldStart]);

  return typedText;
};

const useStyles = makeStyles((theme) => ({
  featureCard: {
    padding: theme.spacing(4),
    textAlign: "center",
  },
  featureIcon: {
    marginBottom: theme.spacing(2),
    transition: "color 0.3s",
  },
  mainContainer: {
    background: "linear-gradient(135deg, #83a4d4, #b6fbff)",
  },
  paper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: theme.spacing(2),
    backdropFilter: "blur(10px)",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) !important",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 1px rgba(0, 0, 0, 0.1) !important",
    transition: "all 0.5s",
    "&:hover": {
      transform: "scale(1.05) translateY(-8px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 1px rgba(0, 0, 0, 0.1) !important",
      "& $featureIcon": {
        color: theme.palette.primary.main,
      },
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 50%) !important",
      transform: "translate(calc(-50% + var(--x)), calc(-50% + var(--y)))",
      opacity: 0,
      transition: "opacity 0.5s, transform 0.5s",
    },
    "&:hover::before": {
      opacity: 1,
      transform: "translate(calc(-50% + var(--x)), calc(-50% + var(--y)))",
    },
  },
}));







interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  const classes = useStyles();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
       <Paper
        className={classes.paper}
        elevation={3}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (cardRef.current) {
            cardRef.current.style.removeProperty('--x');
            cardRef.current.style.removeProperty('--y');
          }
        }}
      >
        <Box className={classes.featureCard}>
          <Box className={classes.featureIcon}>{icon}</Box>
          <Typography variant="h5" component="h3" gutterBottom  color="white">
            {title}
          </Typography>
          <Typography variant="body1" component="p"  color="white">
            {description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};







const TopPage = () => {
  const classes= useStyles();
  const router = useRouter();

  const fadeInSpeed = 2000;
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: fadeInSpeed },
  });

  const [fadeInCompleted, setFadeInCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeInCompleted(true);
    }, fadeInSpeed);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const typingSpeed = 100;
  const typedDescription = useTypingAnimation(
    'Libertaは先生と生徒が繋がる新しい教育プラットフォームです。',
    typingSpeed,
    fadeInCompleted
  );

  const spinIcon = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    loop: true,
    config: { duration: 5000 },
  });
  const handleTeacherLogin = () => {
    router.push("/teacher/SignIn")
  };

  const handleStudentLogin = () => {
    router.push("/student/SignIn")
  };

  return (
    <Box className={classes.mainContainer} >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          color="white"
          textAlign="center"
        >
        <Box display="flex" alignItems="center" mb={2}>
            <animated.div style={spinIcon}>
              <SchoolIcon fontSize="large"/>
            </animated.div>
            <Typography variant="h2" component="h1" gutterBottom>
              Liberta
            </Typography>
          </Box>
          <animated.div style={fadeIn}>
            <Typography variant="h4" component="h2" gutterBottom>
              教育の自由を追求し、新しい学びの場を創造します。
            </Typography>
          </animated.div>
          <Typography variant="body1" component="p" mb={4}>
            {typedDescription}
          </Typography>
          <Box>
            <CustomButton variant="contained" onClick={handleTeacherLogin}>
              先生のログイン
            </CustomButton>
            <CustomButton variant="contained" onClick={handleStudentLogin}>
              生徒のログイン
            </CustomButton>
          </Box>
        </Box>
      <Container sx={{paddingBottom: 20}}>
        <Box mt={10} mb={10} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom color="white">
            サービスの特徴
          </Typography>
          <Typography variant="body1" component="p" color="white">
            Libertaでは以下の特徴を提供します。
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <FeatureCard
            title="オンライン授業"
            description="オンラインで先生と生徒が繋がり、授業が行われます。遠隔地にいても質の高い教育を受けられます。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}}/>}
          />
           <FeatureCard
            title="オンライン授業"
            description="オンラインで先生と生徒が繋がり、授業が行われます。遠隔地にいても質の高い教育を受けられます。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}} />}
          />
           <FeatureCard
            title="オンライン授業"
            description="オンラインで先生と生徒が繋がり、授業が行われます。遠隔地にいても質の高い教育を受けられます。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}} />}
          />
        </Grid>
      </Container>
    </Box>

  );
};

TopPage.displayName = 'TopPage';

export default TopPage;