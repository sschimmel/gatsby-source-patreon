import axios from 'axios';
import qs from 'qs';

export default class PatreonApiClient {

  constructor({ configOptions }) {
    this.client = axios.create({
      baseURL: `https://www.patreon.com/api/oauth2/v2`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${configOptions.token}`
      }
    })
  }

  fetchCampaigns() {
    return this.client.get('/campaigns', {
      params: {
        fields: {
          campaign: 'created_at,creation_name,discord_server_i,image_small_url,image_url,is_charged_immediately,is_monthly,main_video_embed,main_video_url,one_liner,patron_count,pay_per_name,pledge_url,published_at,summary,thanks_embed,thanks_msg,thanks_video_url'
        }
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'brackets'})
      }
    })
  }

  fetchAll() {
    return axios.all([this.fetchCampaigns()])
      .then(axios.spread((campaigns) => {
        return [...campaigns.data.data]
      }))

  }

  refreshToken() {

  }
}
