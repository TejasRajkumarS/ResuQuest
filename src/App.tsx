import React, { useState, useEffect } from 'react';
import { GameStage, GameSettings, Team, Question, AnswerRecord, ResumeItem } from './types';
import { RESUME_QUESTIONS, shuffleQuestionOptions } from './data/questions';
import { soundFx } from './utils/sound';

import { GameSetup } from './components/GameSetup';
import { ScoreBoard } from './components/ScoreBoard';
import { QuestionCard } from './components/QuestionCard';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { TierRankingResults } from './components/TierRankingResults';
import { QuestionReviewModal } from './components/QuestionReviewModal';
import { TurnTransitionOverlay } from './components/TurnTransitionOverlay';

export default function App() {
  const [stage, setStage] = useState<GameStage>('setup');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Settings & Game State
  const [settings, setSettings] = useState<GameSettings>({
    timerSeconds: 20,
    totalQuestions: 15,
    gameMode: 'turn_based',
    soundEnabled: true,
  });

  const [teams, setTeams] = useState<Team[]>([]);
  // Store a dedicated map of 15 unique non-repeating questions per team
  const [teamQuestionsMap, setTeamQuestionsMap] = useState<Record<string, Question[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentTeamTurnIndex, setCurrentTeamTurnIndex] = useState<number>(0);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

  // Round Feedback State
  const [lastAnswerResult, setLastAnswerResult] = useState<{
    isCorrect: boolean;
    selectedOption: number;
    unlockedImpact?: Question['resumeImpact'];
  } | undefined>(undefined);

  // Modals & Overlay Transitions
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewTeamId, setPreviewTeamId] = useState<string>('');
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [showTurnTransition, setShowTurnTransition] = useState<boolean>(false);

  // Update soundFx instance toggle
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);

  // Check for saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('RESUME_BATTLE_SESSION');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.teams && parsed.teams.length > 0 && parsed.stage === 'playing') {
          setHasSavedSession(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save active game state to localStorage
  useEffect(() => {
    if (stage === 'playing' || stage === 'results') {
      try {
        const payload = {
          stage,
          settings,
          teams,
          teamQuestionsMap,
          currentQuestionIndex,
          currentTeamTurnIndex,
          answerRecords,
          timestamp: Date.now(),
        };
        localStorage.setItem('RESUME_BATTLE_SESSION', JSON.stringify(payload));
      } catch {
        // ignore
      }
    }
  }, [stage, settings, teams, teamQuestionsMap, currentQuestionIndex, currentTeamTurnIndex, answerRecords]);

  // Restore saved session
  const handleRestoreSession = () => {
    try {
      const saved = localStorage.getItem('RESUME_BATTLE_SESSION');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings(parsed.settings);
        setTeams(parsed.teams);
        setTeamQuestionsMap(parsed.teamQuestionsMap);
        setCurrentQuestionIndex(parsed.currentQuestionIndex);
        setCurrentTeamTurnIndex(parsed.currentTeamTurnIndex);
        setAnswerRecords(parsed.answerRecords || []);
        setStage(parsed.stage || 'playing');
        setHasSavedSession(false);
      }
    } catch {
      setHasSavedSession(false);
    }
  };

  const handleClearSession = () => {
    try {
      localStorage.removeItem('RESUME_BATTLE_SESSION');
    } catch {
      // ignore
    }
    setHasSavedSession(false);
  };

  // Start a fresh tournament game session with 15 unique questions per team
  const handleStartGame = (teamNames: string[], newSettings: GameSettings) => {
    handleClearSession();
    setSettings(newSettings);
    setSoundEnabled(newSettings.soundEnabled);


    // Initialize Teams
    const initialTeams: Team[] = teamNames.map((name, index) => ({
      id: `team-${index + 1}`,
      name,
      color: index === 0 ? '#004741' : index === 1 ? '#006159' : index === 2 ? '#007b71' : index === 3 ? '#0a9187' : '#1aa89d',
      avatar: name.charAt(0).toUpperCase(),
      score: 0,
      streak: 0,
      maxStreak: 0,
      correctAnswersCount: 0,
      totalAnswersCount: 0,
      totalResponseTimeSeconds: 0,
      unlockedResumeItems: [],
    }));

    // Shuffle options across A, B, C, D and shuffle full bank of 90+ unique questions
    const shuffledPool = RESUME_QUESTIONS
      .map(q => shuffleQuestionOptions(q))
      .sort(() => Math.random() - 0.5);
    const questionsPerTeam = newSettings.totalQuestions; // Default: 15
    const qMap: Record<string, Question[]> = {};

    initialTeams.forEach((team, idx) => {
      const startIdx = idx * questionsPerTeam;
      let assigned = shuffledPool.slice(startIdx, startIdx + questionsPerTeam);

      // Fallback safeguard if total questions required exceeds bank length
      if (assigned.length < questionsPerTeam) {
        const missing = questionsPerTeam - assigned.length;
        const availableFallback = shuffledPool.filter(q => !assigned.some(a => a.id === q.id));
        assigned = [...assigned, ...availableFallback.slice(0, missing)];
      }

      qMap[team.id] = assigned;
    });

    setTeams(initialTeams);
    setTeamQuestionsMap(qMap);
    setCurrentQuestionIndex(0);
    setCurrentTeamTurnIndex(0);
    setAnswerRecords([]);
    setLastAnswerResult(undefined);
    setStage('playing');
    setShowTurnTransition(true);
  };

  // Current active question for current team turn
  const currentTeam = teams[currentTeamTurnIndex];
  const currentTeamQuestions = currentTeam ? teamQuestionsMap[currentTeam.id] || [] : [];
  const currentQuestion = currentTeamQuestions[currentQuestionIndex] || RESUME_QUESTIONS[0];

  // Handle MCQ Answer Submission
  const handleAnswerSubmit = (selectedOption: number, timeSpentSeconds: number) => {
    if (!currentQuestion || !currentTeam) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playIncorrect();
    }

    // Prepare unlocked resume component item if correct
    let unlockedItem: ResumeItem | null = null;
    if (isCorrect) {
      unlockedItem = {
        id: `impact-${currentQuestion.id}-${Date.now()}`,
        category: currentQuestion.resumeImpact.category,
        title: currentQuestion.resumeImpact.unlockedTitle,
        description: currentQuestion.resumeImpact.unlockedDescription,
        isUnlocked: true,
        tierBonus: currentQuestion.resumeImpact.points,
      };
    }

    // Update Team Stats & Dynamic Score
    setTeams(prevTeams =>
      prevTeams.map((t, idx) => {
        if (idx !== currentTeamTurnIndex) return t;

        const newStreak = isCorrect ? t.streak + 1 : 0;
        const newScore = isCorrect
          ? t.score + currentQuestion.resumeImpact.points + (newStreak > 1 ? newStreak * 25 : 0)
          : t.score;

        const newUnlockedItems = unlockedItem
          ? [...t.unlockedResumeItems, unlockedItem]
          : t.unlockedResumeItems;

        return {
          ...t,
          score: newScore,
          streak: newStreak,
          maxStreak: Math.max(t.maxStreak, newStreak),
          correctAnswersCount: t.correctAnswersCount + (isCorrect ? 1 : 0),
          totalAnswersCount: t.totalAnswersCount + 1,
          totalResponseTimeSeconds: t.totalResponseTimeSeconds + timeSpentSeconds,
          unlockedResumeItems: newUnlockedItems,
        };
      })
    );

    // Record Answer
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      teamId: currentTeam.id,
      selectedOption,
      isCorrect,
      timeSpentSeconds,
      timestamp: Date.now(),
    };
    setAnswerRecords(prev => [...prev, record]);

    // Set feedback box state
    setLastAnswerResult({
      isCorrect,
      selectedOption,
      unlockedImpact: isCorrect ? currentQuestion.resumeImpact : undefined,
    });
  };

  // Advance to next round or next team turn
  const handleNextQuestion = () => {
    setLastAnswerResult(undefined);

    // Cycle team turns
    const nextTeamTurn = (currentTeamTurnIndex + 1) % teams.length;
    setCurrentTeamTurnIndex(nextTeamTurn);

    // When full round cycle completes across all teams, advance question index
    if (nextTeamTurn === 0) {
      const nextQIndex = currentQuestionIndex + 1;
      if (nextQIndex >= settings.totalQuestions) {
        // Tournament completed! Reveal results
        setStage('results');
        return;
      } else {
        setCurrentQuestionIndex(nextQIndex);
      }
    }

    // Trigger turn transition animation
    setShowTurnTransition(true);
  };

  const handleOpenResumePreview = (teamId: string) => {
    setPreviewTeamId(teamId);
    setIsPreviewOpen(true);
  };

  const handleRestart = () => {
    setStage('setup');
  };

  // Flat list of all questions used in this tournament for review
  const allAssignedQuestions = Object.values(teamQuestionsMap).flat();

  return (
    <div className="min-h-screen bg-paper font-sans text-ink selection:bg-brand-200 selection:text-brand-900">
      <div className="flex min-h-screen w-full flex-col">
        {stage === 'playing' && (
          <ScoreBoard
            teams={teams}
            activeTeamId={currentTeam?.id || ''}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={settings.totalQuestions}
            onOpenResumePreview={handleOpenResumePreview}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onRestart={handleRestart}
          />
        )}

        <main className="flex flex-1 flex-col items-center">
          {stage === 'setup' && (
            <GameSetup
              onStartGame={handleStartGame}
              defaultSound={soundEnabled}
              onToggleSound={handleToggleSound}
              hasSavedSession={hasSavedSession}
              onRestoreSession={handleRestoreSession}
              onClearSession={handleClearSession}
            />
          )}

          {stage === 'playing' && currentQuestion && currentTeam && (
            <QuestionCard
              question={currentQuestion}
              currentTeam={currentTeam}
              roundNumber={currentQuestionIndex + 1}
              totalRounds={settings.totalQuestions}
              timerDuration={settings.timerSeconds}
              onAnswerSubmit={handleAnswerSubmit}
              onNextQuestion={handleNextQuestion}
              isRoundComplete={!!lastAnswerResult}
              lastAnswerResult={lastAnswerResult}
            />
          )}

          {stage === 'results' && (
            <TierRankingResults
              teams={teams}
              answerRecords={answerRecords}
              allQuestions={allAssignedQuestions}
              onRestart={handleRestart}
              onReviewQuestions={() => setIsReviewOpen(true)}
              onOpenResumePreview={handleOpenResumePreview}
            />
          )}
        </main>
      </div>

      {/* Virtual Resume Modal */}
      <ResumePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        teams={teams}
        initialTeamId={previewTeamId}
      />

      {/* Question & Career Review Modal */}
      <QuestionReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        questions={allAssignedQuestions}
      />

      {/* Cinematic Turn Transition Overlay */}
      {stage === 'playing' && currentTeam && (
        <TurnTransitionOverlay
          activeTeam={currentTeam}
          roundNumber={currentQuestionIndex + 1}
          totalRounds={settings.totalQuestions}
          teamTurnIndex={currentTeamTurnIndex}
          totalTeams={teams.length}
          isVisible={showTurnTransition}
          onDismiss={() => setShowTurnTransition(false)}
        />
      )}

    </div>
  );
}
