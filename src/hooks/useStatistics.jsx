import { useState, createContext, useContext, useEffect } from "react";

const StatisticsContext = createContext();

{
    /* 
    1 click
    tempo medio de uma fig pra outra
    qts clicks dentro do jogo
    lista de acertos e erros
    qts cliques no total,
    qt tempo durou na fase
*/
}

export function StatisticsProvider({ children }) {
    let statistics = [];

    function startLevel(level) {
        let levelStatistic = statistics.find(
            (item) => item.levelName === level
        );

        if (levelStatistic) {
            levelStatistic.rounds = levelStatistic.rounds.map((item) => {
                if (!item.finished) {
                    item.finished = true;
                }
                return item;
            });
        }

        const round = {
            startDate: new Date(),
            clicks: [],
            finished: false,
        };

        if (!levelStatistic) {
            levelStatistic = { levelName: level, rounds: [] };
            levelStatistic.rounds.push(round);
            statistics.push(levelStatistic);
        } else {
            levelStatistic.rounds.push(round);
        }
    }

    function finishLevel(level, win) {
        const levelStatistic = statistics.find(
            (item) => item.levelName === level
        );

        if (levelStatistic) {
            const round = levelStatistic.rounds.find((item) => !item.finished);

            round.finished = true;
            round.finishDate = new Date();
            round.totalTime = (
                (round.finishDate - round.startDate) /
                1000
            ).toFixed(1);
            round.win = win;

            // console.log(JSON.stringify(statistics, null, 2));
        }
    }

    function registerClick(level, correct) {
        const levelStatistic = statistics.find(
            (item) => item.levelName === level
        );

        if (levelStatistic) {
            const round = levelStatistic.rounds.find((item) => !item.finished);

            if (round) {
                round.clicks.push({
                    correct: correct,
                    date: new Date(),
                });
            }
        }
    }

    return (
        <StatisticsContext.Provider
            value={{
                statistics,
                startLevel,
                finishLevel,
                registerClick,
            }}
        >
            {children}
        </StatisticsContext.Provider>
    );
}

export function useStatistics() {
    const context = useContext(StatisticsContext);
    return context;
}
