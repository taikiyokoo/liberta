import React, { useState, useEffect, ReactNode, useRef } from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import { makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import { useRouter } from 'next/router';


//ボタンのスタイル
const CustomButton = styled(Button)`
  margin: 16px;
  width: 200px;
  height: 60px;
  background-color: #ffffff;
  color: #83a4d4;
  font-weight: bold;
  font-size: 14px;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: #e0e0e0; // ホバー時の背景色を薄いグレーに変更
    transform: translateY(-3px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #d0d0d0; // アクティブ時の背景色を濃いグレーに変更
    transform: translateY(0);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:focus-visible {
    background-color: #c0c0c0; // フォーカス時の背景色をさらに濃いグレーに変更
    outline: 2px solid #83a4d4; // アウトラインを青系の色に変更
  }
`;


const useStyles = makeStyles((theme) => ({
  featureCard: {
    height: 300,
    width: 300,
    padding: theme.spacing(4),
    textAlign: "center",
  },
  featureIcon: {
    marginBottom: theme.spacing(2),
    transition: "color 0.3s",
  },
  mainContainer: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    minHeight: "100vh",
    height: "auto",
    background: "linear-gradient(45deg, rgba(102, 191, 226, 1), rgba(102, 191, 226, 1))",
    backgroundSize: "400% 400%",
    animation: "$colorShift 15s ease-in-out infinite",
  },
  "@keyframes colorShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },

  paper: {
    position: "relative",
    overflow: "hidden",
    borderRadius: theme.spacing(2),
    backdropFilter: "blur(50px)",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) !important",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 1px rgba(0, 0, 0, 0.1) !important",
    transition: "all 0.8s",
    //カードのホバーアクション
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
  blendedText: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "transparent",
    mixBlendMode: "screen",
    WebkitBackgroundClip: "text",
    MozBackgroundClip: "text",
    backgroundClip: "text",
  },
}));








const TopPage = () => {
  const classes= useStyles();
  const router = useRouter();
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  //カードのpropsの型定義
  interface FeatureCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    isTypingCompleted: boolean;
  }
  
  //カードコンポーネント
  const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
    const classes = useStyles();
    const cardRef = useRef<HTMLDivElement>(null);
  
  //ホバー時の波動アニメーション
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current || !typingComplete) return;
  
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

  //タイピングアニメーション
  const useTypingAnimation = (text:any, typingSpeed:any, shouldStart:any) => {
    const [typedText, setTypedText] = useState<string>('');
  
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
        setTypingComplete(true)
      };
    }, [text, typingSpeed, shouldStart]);
  
    return typedText;
  };

  //サブタイトルのフェードインアニメーション
  const fadeInSpeed = 1500;
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: fadeInSpeed },
  });

  const buttonFadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: fadeInSpeed },
    delay: 3000
  });

//フェードイン完了状態state
  const [fadeInCompleted, setFadeInCompleted] = useState(false);


  //フェードインアニメーション→タイピングアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeInCompleted(true);
    }, fadeInSpeed);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const typingSpeed = 60;
  const typedDescription = useTypingAnimation(
    'Libertaは先生と生徒が繋がる新しい教育プラットフォームです。',
    typingSpeed,
    fadeInCompleted
  );

  //アイコンのスピンアクション
  const spinIcon = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    loop: true,
    config: { duration: 8000 },
  });

  //ボタンの遷移先の設定
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
        <Box display="flex" alignItems="center" style={{ gap: '8px' }}>
            <animated.div style={spinIcon}>
              <SchoolIcon fontSize="large" sx={{marginRight: 5}}/>
            </animated.div>
            <Typography variant="h2" component="h1" gutterBottom className={classes.blendedText}>
              Liberta
            </Typography>
        </Box>
        <animated.div style={fadeIn}>
          <Typography variant="h4" component="h2" sx={{marginBottom: 3}}  className={classes.blendedText}>
            教育の自由を追求し、新しい学びの場を創造します。
          </Typography>
        </animated.div>
        <Typography variant="body1" component="p" mb={4}  className={classes.blendedText}>
          {typedDescription}
        </Typography>
        <Box mt={2}>
            <animated.div style={buttonFadeIn}>
              <CustomButton variant="contained" onClick={handleTeacherLogin}>
                先生のログイン
              </CustomButton>
              <CustomButton variant="contained" onClick={handleStudentLogin}>
                生徒のログイン
              </CustomButton> 
            </animated.div>
          </Box>
      </Box>
      <Container sx={{paddingBottom: 20}}>
        <Box mt={10} mb={10} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom  className={classes.blendedText}>
            サービスの特徴
          </Typography>
          <Typography variant="body1" component="p"  className={classes.blendedText}>
            Libertaには以下の特徴があります。
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <FeatureCard
            title="さまざまな指導形態"
            description="実際に難関大学に合格した数多くの先生が自分の受験経験から導き出すそれぞれの効率的な指導形態を提案します。あなたはその中から自分に合ったやり方、先生を探すことができます。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}}/>}
            isTypingCompleted={typingComplete}
          />
           <FeatureCard
            title="最新のAIを使用した24時間質問対応"
            description="最新のAI技術を活用した質問対応システムを導入しています。24時間質問対応可能となっています。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}} />}
            isTypingCompleted={typingComplete}
          />
           <FeatureCard
            title="安価な個人契約"
            description="個人契約なので塾や家庭教師仲介会社などを通した中抜きが発生しません。よって安価に指導を受けることができます。"
            icon={<SchoolIcon fontSize="large" sx={{color: "white"}} />}
            isTypingCompleted={typingComplete}
          />
        </Grid>
      </Container>
    </Box>

  );
};

TopPage.displayName = 'TopPage';

export default TopPage;