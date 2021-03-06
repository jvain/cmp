import { h, Component } from 'preact';
import style from './app.less';

import Popup from './popup/popup';
import Footer from './footer/footer';
import Relevant from '../lib/relevant';

export default class App extends Component {
	state = {
		store: this.props.store
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};


	updateState = (store) => {
		this.setState({ store });
	};

	componentWillMount() {
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
		} = state;
		const useFooter = !Relevant.config.hideBottomBar;
		return (
			<div class={style.gdpr}>
				<Popup store={store}
					   onSave={this.onSave}
				/>
				{useFooter && <Footer store={store} />}
			</div>
		);
	}
}
