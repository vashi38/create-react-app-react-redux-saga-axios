import api from '../../apis';
import { createService } from '../../utilities/ServiceFactory';

const SampleApiService = createService(api.sampleTestUrl);

export default SampleApiService;
