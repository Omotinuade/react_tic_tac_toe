import { useState } from "react";
import "./game.css";
const Game = () => {
	const [gameBoard, setgameBoard] = useState(Array(9).fill(""));
	const [turn, setTurn] = useState("X");
	const [gameWinner, setGameWinner] = useState();
	const [tie, setTie] = useState("");
	
	const PlayerWin = (fillBoard) => {
		let checkWin = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};
		for (let checkforwin in checkWin) {
			checkWin[checkforwin].forEach((element) => {
				console.log("element is ", element[0]);
				if (
					fillBoard[element[0]] === fillBoard[element[1]] &&
					fillBoard[element[1]] === fillBoard[element[2]]
				) {
					setGameWinner(
						fillBoard[element[0]]
					);
				}
			});
		}
	};
	const TieFunc = (fillBoard) => {
		let filled = true;
		fillBoard.forEach((cell) => {
			if (cell === "") {
				filled = false;
			}
		});
		if (filled) {
			setTie("The Game is a Tie");
		}
	};

	const click = (x) => {
		let fillBoard = [...gameBoard];
		if (fillBoard[x] !== "") {
			alert("Position already taken");
		}

		while (fillBoard[x] === "") {
			if (turn === "X") {
				fillBoard[x] = turn;
				setTurn("0");
			} else {
				fillBoard[x] = turn;
				setTurn("X");
			}
		}

		PlayerWin(fillBoard);
		TieFunc(fillBoard);
		setgameBoard(fillBoard);
	};

	const Board = ({ x }) => {
		return <td onClick={() => click(x)}>{gameBoard[x]}</td>;
	};

	const restartGame = () => {
		window.location.reload();
	};

	return (
		<div className="container">
			Welcome to the TicTacToe Game <br /> <br /> It is player {turn}'s turn
			<table>
				<tbody>
					<tr>
						<Board x={0} />
						<Board x={1} />
						<Board x={2} />
					</tr>
					<tr>
						<Board x={3} />
						<Board x={4} />
						<Board x={5} />
					</tr>
					<tr>
						<Board x={6} />
						<Board x={7} />
						<Board x={8} />
					</tr>
				</tbody>
			</table>
			{gameWinner ? (
				<>
					<p>Player {gameWinner} is the winner </p>
					<button onClick={restartGame}>Play Again</button>
				</>
			) : (
				<>
					<p> {tie}</p>
					<button onClick={restartGame}>Play Again ?</button>
				</>
			)}
		</div>
	);
};
export default Game;
