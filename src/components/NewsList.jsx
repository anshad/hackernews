import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import { fetchStories } from '../api';

class NewsList extends React.Component {
  constructor(props) {
    super(props);

    const { staticContext, match } = this.props;
    const { data } = staticContext || window.__STATE__ || {};
    const { number } = match.params || 1;

    this.state = {
      stories: data,
      page: number,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    const { stories } = this.state;
    if (!stories) {
      (async () => {
        const { page } = this.state;
        this.setState({ stories: await fetchStories(page) });
      })();
    }
  }

  componentWillUnmount() {
    this.setState({ stories: { hits: [] } });
  }

  nextPage() {
    const { history } = this.props;
    this.setState(
      (prevState) => {
        return { page: parseInt(prevState.page, 10) + 1 };
      },
      () => {
        const { page } = this.state;
        history.push(`/page/${page}`);
        (async () => {
          this.setState({ stories: await fetchStories(page) });
        })();
      },
    );
  }

  previousPage() {
    const { history } = this.props;
    this.setState(
      (prevState) => {
        if (prevState.page > 1) {
          return { page: parseInt(prevState.page, 10) - 1 };
        }
      },
      () => {
        const { page } = this.state;
        history.push(`/page/${page}`);
        (async () => {
          this.setState({ stories: await fetchStories(page) });
        })();
      },
    );
  }

  render() {
    const { stories } = this.state;

    return (
      <>
        <table className='newsList'>
          <thead>
            <tr>
              <th>Comments</th>
              <th>Vote Count</th>
              <th>Up Vote</th>
              <th className='textLeft'>News Details</th>
            </tr>
          </thead>
          <tbody>
            {!stories ||
            typeof stories.hits === 'undefined' ||
            stories.hits.length === 0 ? (
              <tr className='noRecords'>
                <td colSpan={4} className='noRecords'>
                  No records found!
                </td>
              </tr>
            ) : (
              stories.hits.map((item, index) => (
                <tr
                  key={item.objectID}
                  className={index % 2 === 0 ? 'even' : 'odd'}>
                  <td className='textCenter'>{item.num_comments}</td>
                  <td className='textCenter'>{item.points}</td>
                  <td className='textCenter'>#</td>
                  <td>{item.title}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination onNext={this.nextPage} onPrevious={this.previousPage} />
      </>
    );
  }
}

NewsList.defaultProps = {
  staticContext: {},
  match: {},
};

NewsList.propTypes = {
  staticContext: PropTypes.shape({}),
  match: PropTypes.shape({ params: PropTypes.shape({}) }),
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default NewsList;
