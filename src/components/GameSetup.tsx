import React, { useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Play,
  RefreshCw,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { GameSettings } from '../types';

interface GameSetupProps {
  onStartGame: (teamNames: string[], settings: GameSettings) => void;
  defaultSound: boolean;
  onToggleSound: () => void;
  hasSavedSession?: boolean;
  onRestoreSession?: () => void;
  onClearSession?: () => void;
}

const TEAM_COUNT_OPTIONS = [2, 3, 4, 5];

const PRESET_NAMES_POOL = [
  'Career Craft',
  'Resume Mavericks',
  'Talent Titans',
  'ATS Breakers',
  'STAR Strikers',
  'Velocity CV',
  'Impact Innovators',
  'Headline Heroes',
  'Quantified Leaders',
  'Executive Edge',
];

export const GameSetup: React.FC<GameSetupProps> = ({
  onStartGame,
  defaultSound,
  onToggleSound,
  hasSavedSession,
  onRestoreSession,
  onClearSession,
}) => {
  const [teamCount, setTeamCount] = useState(2);
  const [teamNames, setTeamNames] = useState(['Career Craft', 'Resume Mavericks']);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [totalQuestions, setTotalQuestions] = useState(15);

  const handleTeamCountChange = (count: number) => {
    setTeamCount(count);
    setTeamNames((previous) => {
      const next = [...previous];
      if (count > next.length) {
        for (let index = next.length; index < count; index += 1) {
          next.push(PRESET_NAMES_POOL[index % PRESET_NAMES_POOL.length]);
        }
      } else {
        return next.slice(0, count);
      }
      return next;
    });
  };

  const handleNameChange = (index: number, value: string) => {
    setTeamNames((previous) => {
      const updated = [...previous];
      updated[index] = value;
      return updated;
    });
  };

  const randomizeNames = () => {
    const shuffled = [...PRESET_NAMES_POOL].sort(() => Math.random() - 0.5);
    setTeamNames(shuffled.slice(0, teamCount));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validNames = teamNames.map((name, index) => name.trim() || `Team ${index + 1}`);

    onStartGame(validNames, {
      timerSeconds,
      totalQuestions,
      gameMode: 'turn_based',
      soundEnabled: defaultSound,
    });
  };

  return (
    <div className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[18px] border border-line bg-paper-raised shadow-[0_18px_45px_rgba(4,51,47,0.08)] lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="relative flex flex-col justify-between overflow-hidden bg-brand-800 px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-[720px]">
          <div>
            <div className="mb-9 flex items-center gap-3 sm:mb-14">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/15 bg-white/8">
                <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <div className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-brand-200">
                  ResuQuest
                </div>
                <div className="mt-0.5 text-xs text-white/60">Resume skills tournament</div>
              </div>
            </div>

            <p className="rq-eyebrow !text-brand-200">Learn it. Apply it.</p>
            <h1 className="mt-4 max-w-md text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-4xl">
              Turn resume know-how into a team competition.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Teams answer recruiter-focused questions, earn points, and build a practical resume playbook along the way.
            </p>

            <div className="mt-10 hidden space-y-5 border-t border-white/12 pt-8 sm:block">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-200" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">90 practical questions</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">Cover ATS, metrics, structure, tailoring, and more.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-200" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">A resume built in play</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">Correct answers unlock reusable resume components.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-200" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">Built for 2–5 teams</p>
                  <p className="mt-1 text-xs leading-5 text-white/60">Use a shared screen for classroom, team, or workshop play.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 hidden text-xs leading-5 text-white/45 sm:block">
            Best on one shared screen. Players can use number keys or A–D to answer.
          </p>
        </aside>

        <div className="px-5 py-6 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          {hasSavedSession && onRestoreSession && (
            <div className="mb-8 flex flex-col gap-4 rounded-[12px] border border-brand-200 bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-brand-900">An unfinished game is saved</p>
                <p className="mt-1 text-xs leading-5 text-ink-soft">Resume the current round or discard it and set up a new game.</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {onClearSession && (
                  <button type="button" onClick={onClearSession} className="rq-button-secondary !min-h-10 !px-3">
                    Discard
                  </button>
                )}
                <button type="button" onClick={onRestoreSession} className="rq-button-primary !min-h-10 !px-3">
                  Resume game
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between gap-4 border-b border-line pb-7">
            <div>
              <p className="rq-eyebrow">New session</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-brand-900 sm:text-3xl">
                Game setup
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-ink-soft">
                Name the teams and choose the pace. You can change these for every round.
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className="rq-icon-button"
              aria-label={defaultSound ? 'Turn sound off' : 'Turn sound on'}
              title={defaultSound ? 'Turn sound off' : 'Turn sound on'}
            >
              {defaultSound ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-9">
            <section aria-labelledby="team-setup-heading">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 id="team-setup-heading" className="text-base font-extrabold text-brand-900">
                    Participating teams
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">Choose the number of teams, then give each one a name.</p>
                </div>
                <button type="button" onClick={randomizeNames} className="rq-button-quiet !min-h-10 self-start !px-2.5">
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Randomize names
                </button>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Number of teams">
                {TEAM_COUNT_OPTIONS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleTeamCountChange(count)}
                    aria-pressed={teamCount === count}
                    className={`min-h-11 rounded-[9px] border px-2 text-xs font-extrabold transition-colors ${
                      teamCount === count
                        ? 'border-brand-700 bg-brand-700 text-white'
                        : 'border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800'
                    }`}
                  >
                    <span className="sm:hidden">{count}</span>
                    <span className="hidden sm:inline">{count} teams</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {teamNames.map((name, index) => {
                  const inputId = `team-name-${index}`;
                  return (
                    <div key={index}>
                      <label htmlFor={inputId} className="mb-2 block text-xs font-extrabold uppercase tracking-[0.09em] text-ink-soft">
                        Team {index + 1}
                      </label>
                      <input
                        id={inputId}
                        type="text"
                        value={name}
                        onChange={(event) => handleNameChange(index, event.target.value)}
                        placeholder={`Team ${index + 1}`}
                        maxLength={24}
                        className="rq-input"
                        required
                      />
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="rq-rule" />

            <section aria-labelledby="round-settings-heading">
              <div>
                <h3 id="round-settings-heading" className="text-base font-extrabold text-brand-900">
                  Round settings
                </h3>
                <p className="mt-1 text-xs leading-5 text-ink-soft">Set the pace once; every team plays under the same rules.</p>
              </div>

              <div className="mt-5 grid gap-7 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-3 flex items-center gap-2 text-xs font-extrabold text-brand-900">
                    <Clock3 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                    Time per question
                  </legend>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 30, 0].map((seconds) => (
                      <button
                        key={seconds}
                        type="button"
                        onClick={() => setTimerSeconds(seconds)}
                        aria-pressed={timerSeconds === seconds}
                        className={`min-h-11 rounded-[9px] border px-2 text-xs font-extrabold transition-colors ${
                          timerSeconds === seconds
                            ? 'border-brand-700 bg-brand-700 text-white'
                            : 'border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800'
                        }`}
                      >
                        {seconds === 0 ? 'None' : `${seconds}s`}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 flex items-center gap-2 text-xs font-extrabold text-brand-900">
                    <FileCheck2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                    Questions per team
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 15, 20].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setTotalQuestions(count)}
                        aria-pressed={totalQuestions === count}
                        className={`min-h-11 rounded-[9px] border px-2 text-xs font-extrabold transition-colors ${
                          totalQuestions === count
                            ? 'border-brand-700 bg-brand-700 text-white'
                            : 'border-line bg-white text-ink-soft hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-[10px] border border-line bg-white px-4 py-3.5">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-brand-900">Turn-based hotseat</p>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">Teams pass the screen in order after every answer.</p>
                </div>
              </div>
            </section>

            <button type="submit" className="rq-button-primary w-full !min-h-12 !text-sm">
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Start game
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
