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

const userAnswers = Array(10).fill(null);

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

			const buttons = $(`.question-${index} button`);
			buttons.on('click', (event) => {
				buttons.removeClass('selected');

				userAnswers[index] = event.target.textContent;
				event.target.classList.add('selected');

				const isNullInAnswer = userAnswers.includes(null);

				if (isNullInAnswer) {
					console.log("vous n'avez pas tout fait");
					$('button[type=submit]').attr('disabled', true);
				} else {
					console.log('vous avez terminé');
					$('button[type=submit]').attr('disabled', false);
				}
			});
		});

		$('.questions').append(
			"<button type='submit' disabled>Soumettre le quizz</button>"
		);

		$('button[type=submit]').on('click', (e) => {
			let score = 0;
			userAnswers.forEach((oneAnswer, index) => {
				if (data.results[index].correct_answer === oneAnswer) {
					score++;
				}
			});
			$('.score').text(`${score}/10`);
		});
	} catch (error) {
		$('.error').text(error);
	}
}

//getQuestions();

const form = $('.register form');

form.on('submit', async (event) => {
	event.preventDefault();

	const name = $('#name').val();
	const email = $('#email').val();
	const password = $('#password').val();

	const request = await fetch(
		'https://api.which-one-battle.julienpoirier-webdev.com/api/users',
		{
			method: 'POST',
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
			headers: {
				'Content-Type': 'application/json', // MIME TYPE
			},
		}
	);

	const data = await request.json();
	console.log(data);
});
