import './style.css';
import $ from 'jquery';

// Requete AJAX

// Etape 1 : Toucher/ faire requete une URL
// Etape 2 :  Attendre la réponse et extraire les données
// Etape 3 : Attendre les données et en faire quelque chose.
/*
fetch('https://api.gameofthronesquotes.xyz/v1/random')
	.then((response) => {
		response
			.json()
			.then((data) => {
				$('.GOT').html(
					`<h2>${data.character.name}</h2><p>${data.sentence}</p>`
				);
			})
			.catch((error) => {
				console.log(error);
			});
	})
	.catch((error) => {
		$('.error').text('Erreur oupsy');
	});
  */

async function getQuestions() {
	try {
		const response = await fetch('https://opentdb.com/api.php?amount=10');
		const data = await response.json();

		data.results.forEach((element, index) => {
			const responses = [
				element.correct_answer,
				...element.incorrect_answers,
			];

			responses.sort(() => Math.random() - 0.5);

			console.log(responses);

			$('.questions').append(
				`<div class="question-${index}">
          <h3><span>Question ${index + 1}</span> - ${element.question}</h3>
        </div>`
			);

			responses.forEach((response) => {
				$(`.question-${index}`).append(`<button>${response}</button>`);
			});
		});
	} catch (error) {
		$('.error').text(error);
	}
}

getQuestions();
