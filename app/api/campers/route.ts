import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

import { isAxiosError } from 'axios';
import { serializeParams } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 4);
    const form = request.nextUrl.searchParams.get('form') ?? '';
    const transmission = request.nextUrl.searchParams.get('transmission') ?? '';
    const engine = request.nextUrl.searchParams.get('engine') ?? '';
    const AC = request.nextUrl.searchParams.get('AC') ?? '';
    const bathroom = request.nextUrl.searchParams.get('bathroom') ?? '';
    const kitchen = request.nextUrl.searchParams.get('kitchen') ?? '';
    const TV = request.nextUrl.searchParams.get('TV') ?? '';
    const radio = request.nextUrl.searchParams.get('radio') ?? '';
    const refrigerator = request.nextUrl.searchParams.get('refrigerator') ?? '';
    const microwave = request.nextUrl.searchParams.get('microwave') ?? '';
    const gas = request.nextUrl.searchParams.get('gas') ?? '';
    const water = request.nextUrl.searchParams.get('water') ?? '';
    const location = request.nextUrl.searchParams.get('location') ?? '';
    const sortBy = request.nextUrl.searchParams.get('sortBy') ?? '';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') ?? '';

    // console.log('AC=', AC);
    // console.log('transmission=', transmission);
    // console.log('gas=', gas);
    // console.log('form=', form);

    // console.log({
    //   page,
    //   limit: perPage,
    //   ...(form && { form }),
    //   ...(transmission && { transmission }),
    //   ...(engine && { engine }),
    //   ...(AC && { AC }),
    //   ...(bathroom && { bathroom }),
    //   ...(kitchen && { kitchen }),
    //   ...(TV && { TV }),
    //   ...(radio && { radio }),
    //   ...(refrigerator && { refrigerator }),
    //   ...(microwave && { microwave }),
    //   ...(gas && { gas }),
    //   ...(water && { water }),
    //   ...(location && { location }),
    //   ...(sortBy && { sortBy }),
    //   ...(sortOrder && { sortOrder }),
    // });

    const res = await api('/campers', {
      params: {
        page,
        limit: perPage,
        ...(form && { form }),
        ...(transmission && { transmission }),
        ...(engine && { engine }),
        ...(AC && { AC }),
        ...(bathroom && { bathroom }),
        ...(kitchen && { kitchen }),
        ...(TV && { TV }),
        ...(radio && { radio }),
        ...(refrigerator && { refrigerator }),
        ...(microwave && { microwave }),
        ...(gas && { gas }),
        ...(water && { water }),
        ...(location && { location }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
      },
      paramsSerializer: {
        serialize: serializeParams,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
