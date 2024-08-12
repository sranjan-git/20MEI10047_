import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
const windowSize = 10;
let windowNumbers: number[] = [];

const accessToken = process.env.ACCESS_TOKEN;

async function fetchNumbers(numberid: string): Promise<number[]> {
  try {
    const sourceUrl = `http://20.244.56.144/test/${numberid}`;
    
    const response = await axios.get(sourceUrl, {
      headers: {
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIzNDU3MjUxLCJpYXQiOjE3MjM0NTY5NTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE2NGU1NzIwLTFkNDQtNDNiOC04ZmUwLTZlN2MxNTdjMjYyMyIsInN1YiI6InNyYW5qYW4uZWR1Y2F0aW9uQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvQ2FydCIsImNsaWVudElEIjoiYTY0ZTU3MjAtMWQ0NC00M2I4LThmZTAtNmU3YzE1N2MyNjIzIiwiY2xpZW50U2VjcmV0IjoibUVYcVBMTnJ6TXNaY3JuZCIsIm93bmVyTmFtZSI6IlN1ZGhhbnNodSIsIm93bmVyRW1haWwiOiJzcmFuamFuLmVkdWNhdGlvbkBnbWFpbC5jb20iLCJyb2xsTm8iOiI0NyJ9.DKvylwRUD5FgFmc5FAviV-0Oym7LTAmoOwmbZOUijpk"}`, 
      },
      timeout: 500, 
    });
    
    const numbers: number[] = response.data.numbers;
    return numbers;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching numbers:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
}

router.get('/:numberid', async (req: Request, res: Response) => {
  const { numberid } = req.params;

  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const prevState = [...windowNumbers];
  const newNumbers = await fetchNumbers(numberid);

  newNumbers.forEach((num) => {
    if (!windowNumbers.includes(num)) {
      if (windowNumbers.length >= windowSize) {
        windowNumbers.shift();
      }
      windowNumbers.push(num);
    }
  });

  const avg = calculateAverage(windowNumbers);

  return res.json({
    windowPrevState: prevState,
    windowCurrState: windowNumbers,
    numbers: newNumbers,
    avg,
  });
});

export default router;
