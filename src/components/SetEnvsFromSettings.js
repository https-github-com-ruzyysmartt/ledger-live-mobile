// @flow
import { PureComponent } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setEnvUnsafe } from "@ledgerhq/live-common/lib/env";
import { hideEmptyTokenAccountsEnabledSelector } from "../reducers/settings";

const mapStateToProps = createStructuredSelector({
  hideEmptyTokenAccountsEnabled: hideEmptyTokenAccountsEnabledSelector,
});

class SetEnvsFromSettings extends PureComponent<{
  hideEmptyTokenAccountsEnabled: boolean,
}> {
  apply() {
    const { hideEmptyTokenAccountsEnabled } = this.props;

    setEnvUnsafe("HIDE_EMPTY_TOKEN_ACCOUNTS", hideEmptyTokenAccountsEnabled);
  }

  componentDidMount() {
    this.apply();
  }

  componentDidUpdate() {
    this.apply();
  }

  render() {
    return null;
  }
}

export default connect(mapStateToProps)(SetEnvsFromSettings);
