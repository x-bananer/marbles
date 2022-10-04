<template>
	<v-layout column justify-center align-center>
		<v-flex xs12 sm8>
			<v-card min-width="360">
				<v-card-title>
					<h1>Вход</h1>
				</v-card-title>
				<v-card-text>
					<v-form
						ref="form"
						v-model="valid"
						lazy-validation
					>
						<v-text-field
							v-model="form.name"
							:counter="10"
							:rules="nameRules"
							label="Имя или псевдоним"
							required
						/>

						<v-text-field
							v-model="form.room"
							:rules="roomRules"
							label="Название комнаты"
							required
						/>

						<v-btn
							:disabled="!valid"
							color="primary"
							class="mr-4"
							@click="onClickSubmit"
						>
							Войти
						</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-alert
			dense
			type="error"
			v-if="formError.error"
		>
      		{{ formError.error }}
    	</v-alert>
	</v-layout>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	head() {
        return {
            title: 'Marbles',
        }
    },
	name: 'PageAuth',
	layout: 'empty',
	sockets: {
		connect() {
			console.log('Client IO connected')
		}
	},
	data() {
		return {
			valid: true,
			form: {
				name: '',
				room: '',
				id: undefined,
			},
			formError: {
				error: '',
			},
			nameRules: [
				v => !!v || 'Это обязательное поле',
				v => (v && v.length <= 10) || 'Имя должно быть короче 10 символов',
			],
			roomRules: [
				v => !!v || 'Это обязательное поле',
			],
		}
    },
    methods: {
		...mapMutations(['setUser']),
    	onClickSubmit() {
    		if (this.$refs.form.validate()) {
				this.$socket.emit('userJoined', this.form, data => {
					if (typeof data === 'string') {
						setTimeout(() => {
							this.formError.error = data;
						}, 1000);
					} else {
						this.form.id = data.userId;
						this.setUser(this.form);
						this.$router.push('/playground');
					}
				});
			}
    	},
    },
};
</script>
